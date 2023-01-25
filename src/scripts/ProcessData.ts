import { Dispatch } from '@reduxjs/toolkit';
import I18n from 'i18n-js';
import inatjs from 'inaturalistjs';
import { setAllAchievementData } from '../redux/slices/AchievementsSlice';
import { populateTaxonRankCache } from '../redux/slices/AppSlice';
import { setProgressAlert, setProgressLoading, setProgressMessage, setProgressValue } from '../redux/slices/ProgressSlice';
import { AchievementDataType, TaxonRankCacheType } from '../types/AchievementsTypes';
import { ObservationsResponse, TaxaShowResponse } from '../types/iNaturalistTypes';
import { FLOWER_CHILD_TAXA } from './achievements/FlowerChild';
import { CLASS_RANK, ORDER_RANK } from './achievements/utils';
import { getTaxonRank, isTaxonCached, populateTaxonRank } from './achievements/utils/TaxonCache';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import worker from 'workerize-loader!./workers/worker';

// 200 seems to be the maximum iNat wants
const RESULT_PER_PAGE_LIMIT = 200;

// 100 seems to be the maximum iNat wants (the time taken for iNat to respond results in this being effectively less than the specified value)
// The TaxonCache also floods iNat (initially) so it's best to keep this number low
const REQUEST_PER_MINUTE_LIMIT = 80;

const THROTTLE_SLEEP_TIME = 60 * 1000 / REQUEST_PER_MINUTE_LIMIT;

// Default to one minute of loading data (the top 500 observers seems to have 15000+ observations), not counting the taxa rank caching
const TOTAL_RESULTS_LIMIT = REQUEST_PER_MINUTE_LIMIT * RESULT_PER_PAGE_LIMIT;

// 1 is the first page (not 0)
const FIRST_PAGE = 1;

// Setup Web Worker
const workerInstance = worker();

const PRINT_LOG = true;

export async function resetAchievements(dispatch: Dispatch<any>) {
    console.log(`>>> start resetting... [${new Date().getTime()}]`)
    workerInstance && workerInstance.reset()
        .then(async (evaluatedAchievementData: AchievementDataType[]) => {
            console.log(`>>>>>> RESET: done [${new Date().getTime()}]`);
            dispatch(setAllAchievementData(evaluatedAchievementData));
        });
}

declare type CalcState = {
    page: number,
    resultCount: number,
    totalResults: number
}

export async function calculateAchievements(
    dispatch: Dispatch<any>,
    taxonRanks: TaxonRankCacheType[],
    username: string,
    readLimit = TOTAL_RESULTS_LIMIT,
    calcState: CalcState = { page: FIRST_PAGE, resultCount: 0, totalResults: -1 }
) {
    PRINT_LOG && console.log(`calculateAchievements: BEGIN ${username} | limit=${readLimit} | page=${calcState.page} | resultCount=${calcState.resultCount} | totalResults=${calcState.totalResults}`);
    // Sleep for a bit before starting (to comply with the iNat requests per minute limit)
    await sleep();
    // Prepare fetch parameters
    const iNatParams = {
        user_id: username,
        per_page: RESULT_PER_PAGE_LIMIT,
        page: calcState.page,
        order_by: 'observed_on', // Sort by observation date (descending by default)
        captive: false, // Only wild observations
        verifiable: true // Exclude casual observations
    }
    // Adjust per_page if it exceeds the read limit
    if (calcState.page * RESULT_PER_PAGE_LIMIT > readLimit) {
        iNatParams.per_page = Math.max(0, readLimit - ((calcState.page - 1) * RESULT_PER_PAGE_LIMIT));
        PRINT_LOG && console.log(`calculateAchievements: adjusting per_page to ${iNatParams.per_page} due to read limit`);
    }
    // Fetch the data from iNaturalist
    if (calcState.page === 1 || (iNatParams.per_page > 0 && ((calcState.page - 1) * RESULT_PER_PAGE_LIMIT + iNatParams.per_page) <= Math.min(calcState.totalResults, readLimit))) {
        // Update the UI
        PRINT_LOG && console.log(`calculateAchievements: fetch data for ${username} | page ${calcState.page}`);
        dispatch(setProgressMessage(I18n.t('progressFetching', {
            per_page: iNatParams.per_page,
            count: calcState.resultCount,
            total: calcState.totalResults < 0 ? I18n.t('progressUnknown') : Math.min(calcState.totalResults, readLimit)
        })));
        // Fetch and process the next batch of observations
        fetchAndProcessObservations(dispatch, taxonRanks, username, readLimit, iNatParams, calcState);
    }
    else {
        // All data has been fetched, update the UI accordingly
        PRINT_LOG && console.log('calculateAchievements: don\'t fetch any more data (processed', Math.min(calcState.page * RESULT_PER_PAGE_LIMIT, readLimit), 'results)');
        dispatch(setProgressMessage(I18n.t('progressDone', { user: username, count: calcState.resultCount })));
        dispatch(setProgressValue(100));
        dispatch(setProgressLoading(false));
        dispatch(setProgressAlert(true));
    }
    PRINT_LOG && console.log(`calculateAchievements: END ${username} | page=${calcState.page} | total=${calcState.totalResults} | limit=${readLimit}`);
}

async function fetchAndProcessObservations(
    dispatch: Dispatch<any>,
    taxonRanks: TaxonRankCacheType[],
    username: string,
    readLimit: number,
    iNatParams: any,
    calcState: CalcState
) {
    inatjs.observations.search(iNatParams)
        .then(async (observationsResponse: ObservationsResponse) => {
            // Prepare
            await prepareToCalculate(dispatch, taxonRanks, observationsResponse);
            // Evaluate
            calcState.totalResults = observationsResponse.total_results!;
            PRINT_LOG && console.log(`calculateAchievements: found ${observationsResponse.results.length ?? 0} results to evaluate | ${calcState.totalResults} in total [${new Date().getTime()}]`);
            dispatch(setProgressMessage(I18n.t('progressCalculating', { per_page: observationsResponse.results.length ?? 0 })));
            console.log(`>>> start calculating... [${new Date().getTime()}]`)
            workerInstance && workerInstance.evaluate(observationsResponse.results)
                .then(async (evaluatedAchievementData: AchievementDataType[]) => {
                    console.log(`>>>>>> EVALUATE: done [${new Date().getTime()}]`);
                    // Update the achievement cards' data
                    dispatch(setAllAchievementData(evaluatedAchievementData));
                    // Update the progress bar
                    calcState.resultCount = calcState.resultCount + observationsResponse.results.length;
                    dispatch(setProgressValue(calcState.resultCount / Math.min(calcState.totalResults, readLimit) * 100));
                    // Recursively fetch and process the next set of observations
                    PRINT_LOG && console.log(`calculateAchievements: preparing to fetch next page... [${new Date().getTime()}]`);
                    calcState.page++;
                    calculateAchievements(dispatch, taxonRanks, username, readLimit, calcState);
                });
            PRINT_LOG && console.log(`calculateAchievements: promise completed ${username} | page=${calcState.page} [${new Date().getTime()}]`);
        })
        .catch((e: any) => console.error('Failed observations search:', e));
}

async function prepareToCalculate(
    dispatch: Dispatch<any>,
    taxonRanks: TaxonRankCacheType[],
    observationsResponse: ObservationsResponse
) {
    PRINT_LOG && console.log('calculateAchievements: found ', observationsResponse.results.length ?? 0, ' results to prepare');
    dispatch(setProgressMessage(I18n.t('progressPreparing', { per_page: observationsResponse.results.length ?? 0 })));
    for (let observation of observationsResponse.results) {
        if (observation?.taxon?.ancestor_ids && observation.taxon.ancestor_ids.length > 2) {
            // TODO: Find a more generic way to handle this and still limit how many ranks are loaded
            let isForFlowerChild = false;
            for (let taxonID of observation.taxon.ancestor_ids) {
                if (taxonID === FLOWER_CHILD_TAXA) {
                    isForFlowerChild = true;
                    break;
                }
            }
            const relevantAncestors = observation.taxon.ancestor_ids.slice(2, Math.min(7, observation.taxon.ancestor_ids.length));
            for (let taxonID of relevantAncestors) {
                if (!isTaxonCached(taxonID)) {
                    const localStorageIndex = taxonRanks.findIndex(cache => cache.taxonID === taxonID);
                    if (localStorageIndex >= 0) {
                        populateTaxonRank(taxonID, taxonRanks[localStorageIndex].rank);
                    }
                    else {
                        await sleep();
                        await inatjs.taxa.fetch([taxonID], {})
                            .then((taxon: TaxaShowResponse) => {
                                PRINT_LOG && console.log(`calculateAchievements: fetch the rank of taxon ${taxonID}`);
                                if (taxon.total_results === 1) {
                                    const rank = taxon.results[0].rank_level;
                                    if (rank) {
                                        populateTaxonRank(taxonID, rank);
                                        dispatch(populateTaxonRankCache({ taxonID, rank }));
                                    }
                                }
                                else
                                    console.error(`Could not cache rank for taxon ${taxonID}`);
                            });
                        const rank = getTaxonRank(taxonID) ?? -1;
                        if ((!isForFlowerChild && rank <= CLASS_RANK) || (rank <= ORDER_RANK))
                            break;
                    }
                }
            }
        }
    }
}

async function sleep() {
    PRINT_LOG && console.log(`calculateAchievements: rest for ${THROTTLE_SLEEP_TIME}ms`);
    await new Promise(resolve => setTimeout(resolve, THROTTLE_SLEEP_TIME));
}
