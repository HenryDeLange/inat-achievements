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
import { getTaxonRank, getTaxonRanksAsTaxonRankCacheType, isTaxonCached, populateTaxonRank } from './achievements/utils/TaxonCache';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import worker from 'workerize-loader!./workers/worker';

// 200 seems to be the maximum iNat wants
const RESULT_PER_PAGE_LIMIT = 12; //200;

// 100 seems to be the maximum iNat wants (the time taken for iNat to respond results in this being effectively less than the specified value)
// The TaxonCache also floods iNat (initially) so it's best to keep this number low
const REQUEST_PER_MINUTE_LIMIT = 70;

const THROTTLE_SLEEP_TIME = Math.round(60 * 1000 / REQUEST_PER_MINUTE_LIMIT);

// The iNat API cuts off pagination when 10 000 records have been fetched (due to database concerns),
// they suggest to  rather try to change the query parameters (for example using id_above, etc.) instead of performing excessive pagination
const QUERY_PARAMS_ROTATE_LIMIT = RESULT_PER_PAGE_LIMIT * 2; // * 20;

// 1 is the first page (not 0)
const FIRST_PAGE = 1;

// Flag to turn detailed logging on/off
const PRINT_LOG = true;

// Setup Web Worker
const workerInstance = worker();

export async function resetAchievements(dispatch: Dispatch<any>) {
    PRINT_LOG && console.log(`<<RESET>>: BEGIN`)
    workerInstance.reset()
        .then(async (evaluatedAchievementData: AchievementDataType[]) => {
            PRINT_LOG && console.log(`<<RESET>>: END`);
            dispatch(setAllAchievementData(evaluatedAchievementData));
        });
}

declare type CalcState = {
    page: number,
    resultCount: number,
    totalResults: number,
    mostRecentlyActiveDate: string,
    mostRecentlyActiveProcessedObservations: number[],
    queryParamChanges: number
}

export async function calculateAchievements(
    dispatch: Dispatch<any>,
    taxonRanks: TaxonRankCacheType[],
    username: string,
    readLimit: number = 0,
    calcState: CalcState = {
        page: FIRST_PAGE,
        resultCount: 0,
        totalResults: -1,
        mostRecentlyActiveDate: new Date().toISOString().split('T')[0],
        mostRecentlyActiveProcessedObservations: [],
        queryParamChanges: 0
    }
) {
    PRINT_LOG && console.log(`<calc>: BEGIN 
        | user=${username}
        | page=${calcState.page}
        | limit=${readLimit}
        | resultCount=${calcState.resultCount}
        | totalResults=${calcState.totalResults}
        | mostRecentlyActiveDate=${calcState.mostRecentlyActiveDate}
        | mostRecentlyActiveProcessedObservations=${calcState.mostRecentlyActiveProcessedObservations.length}
        | queryParamChanges=${calcState.queryParamChanges}`);
    // Sleep for a bit before starting (to comply with the iNat requests per minute limit)
    await sleep();
    // Prepare fetch parameters
    const iNatParams = {
        user_id: username,
        per_page: RESULT_PER_PAGE_LIMIT,
        page: calcState.page,
        d2: calcState.mostRecentlyActiveDate, // Observed on or before this date
        order_by: 'observed_on', // Sort by observation date (descending by default)
        captive: false, // Only wild observations
        verifiable: true // Exclude casual observations
    }
    // Adjust per_page if it exceeds the read limit
    const pagesCount = calcState.page - 1;
    const totalRead = pagesCount * RESULT_PER_PAGE_LIMIT + (calcState.queryParamChanges * QUERY_PARAMS_ROTATE_LIMIT);
    if (readLimit > 0 && calcState.page * RESULT_PER_PAGE_LIMIT > readLimit) {
        iNatParams.per_page = Math.max(0, readLimit - totalRead);
        iNatParams.per_page > 0 && PRINT_LOG && console.log(`<calc>: adjusting per_page to ${iNatParams.per_page} due to read limit`);
    }
    // Adjust d2 (from data) if more than QUERY_PARAMS_ROTATE_LIMIT number of records have been read
    if (iNatParams.per_page > 0 && pagesCount * RESULT_PER_PAGE_LIMIT + iNatParams.per_page > QUERY_PARAMS_ROTATE_LIMIT) {
        iNatParams.d2 = calcState.mostRecentlyActiveDate;
        calcState.page = FIRST_PAGE;
        calcState.queryParamChanges++;
        PRINT_LOG && console.log(`<calc>: adjusting d2 (from date) to ${iNatParams.d2} to avoid paging to past ${QUERY_PARAMS_ROTATE_LIMIT} records`);
    }
    // Fetch the data from iNaturalist
    if (calcState.page === FIRST_PAGE
            || (iNatParams.per_page > 0 && (totalRead + iNatParams.per_page) <= Math.min(calcState.totalResults, readLimit))) {
        // Update the UI
        PRINT_LOG && console.log(`<calc>: fetch data for ${username} | page ${calcState.page}`);
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
        PRINT_LOG && console.log('<calc>: don\'t fetch any more data (processed', Math.min(calcState.page * RESULT_PER_PAGE_LIMIT, readLimit), 'results)');
        dispatch(setProgressMessage(I18n.t('progressDone', { user: username, count: calcState.resultCount })));
        dispatch(setProgressValue(100));
        dispatch(setProgressLoading(false));
        dispatch(setProgressAlert(true));
    }
    PRINT_LOG && console.log(`<calc>: END 
        | user=${username}
        | page=${calcState.page}
        | limit=${readLimit}
        | resultCount=${calcState.resultCount}
        | totalResults=${calcState.totalResults}
        | mostRecentlyActiveDate=${calcState.mostRecentlyActiveDate}
        | mostRecentlyActiveProcessedObservations=${calcState.mostRecentlyActiveProcessedObservations.length}
        | queryParamChanges=${calcState.queryParamChanges}`);
}

async function fetchAndProcessObservations(
    dispatch: Dispatch<any>,
    taxonRanks: TaxonRankCacheType[],
    username: string,
    readLimit: number,
    iNatParams: any,
    calcState: CalcState
) {
    inatjs.observations.search(iNatParams, { user_agent: 'wild-achievements' })
        .then(async (observationsResponse: ObservationsResponse) => {
            // Prepare
            await cacheTaxonRanks(dispatch, taxonRanks, observationsResponse);
            taxonRanks = getTaxonRanksAsTaxonRankCacheType(); // Refresh the taxonRanks to use the latest cached values
            // Evaluate
            calcState.totalResults = observationsResponse.total_results!;
            PRINT_LOG && console.log(`<calc>: found ${observationsResponse.results.length ?? 0} results to evaluate | ${calcState.totalResults} in total`);
            dispatch(setProgressMessage(I18n.t('progressCalculating', { per_page: observationsResponse.results.length ?? 0 })));
            let obsToEvaluate = observationsResponse.results;
            if (calcState.mostRecentlyActiveProcessedObservations.length > 0) {
                obsToEvaluate = observationsResponse.results.filter((observation) => {
                    for (let alreadyProcessed of calcState.mostRecentlyActiveProcessedObservations) {
                        if (observation.id === alreadyProcessed) {
                            PRINT_LOG && console.log(`<calc>: don't reprocess observation ${alreadyProcessed}`);
                        }
                    }
                    return true;
                });
            }
            workerInstance.evaluate(obsToEvaluate, taxonRanks)
                .then(async (evaluatedAchievementData: AchievementDataType[]) => {
                    PRINT_LOG && console.log(`<calc>: web worker is done evaluating ${observationsResponse.results.length} observations`);
                    // Update the achievement cards' data
                    dispatch(setAllAchievementData(evaluatedAchievementData));
                    // Update the progress bar
                    calcState.resultCount = calcState.resultCount + observationsResponse.results.length;
                    dispatch(setProgressValue(calcState.resultCount / Math.min(calcState.totalResults, readLimit) * 100));
                    // Keep track of the most recent active date and already processed observations
                    calcState.mostRecentlyActiveDate = observationsResponse.results[observationsResponse.results.length - 1].observed_on!;
                    calcState.mostRecentlyActiveProcessedObservations = [];
                    for (let observation of observationsResponse.results) {
                        if (observation.observed_on === calcState.mostRecentlyActiveDate) {
                            calcState.mostRecentlyActiveProcessedObservations.push(observation.id!);
                        }
                    }
                    // Recursively fetch and process the next set of observations
                    PRINT_LOG && console.log(`<calc>: preparing to fetch next observations...`);
                    calcState.page++;
                    calculateAchievements(dispatch, taxonRanks, username, readLimit, calcState);
                });
            PRINT_LOG && console.log(`<calc>: iNat fetch is done | user=${username} | page=${calcState.page}`);
        })
        .catch((e: any) => console.error('Failed observations search:', e));
}

async function cacheTaxonRanks(
    dispatch: Dispatch<any>,
    taxonRanks: TaxonRankCacheType[],
    observationsResponse: ObservationsResponse
) {
    PRINT_LOG && console.log(`<taxa-cache>: check the taxon rank cache for ${observationsResponse.results.length ?? 0} observations...`);
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
                        PRINT_LOG && console.log(`<taxa-cache>: fetch the rank for taxon ${taxonID}`);
                        await inatjs.taxa.fetch([taxonID], { user_agent: 'wild-achievements' })
                            .then((taxon: TaxaShowResponse) => {
                                if (taxon.total_results === 1) {
                                    const rank = taxon.results[0].rank_level;
                                    if (rank) {
                                        PRINT_LOG && console.log(`<taxa-cache>: cache the rank ${rank} for taxon ${taxonID}`);
                                        populateTaxonRank(taxonID, rank);
                                        dispatch(populateTaxonRankCache({ taxonID, rank }));
                                    }
                                    else
                                        console.error(`Could not access rank for taxon ${taxonID}`);
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
    PRINT_LOG && console.log(`<calc>: ... ... resting for ${THROTTLE_SLEEP_TIME}ms ... ...`);
    await new Promise(resolve => setTimeout(resolve, THROTTLE_SLEEP_TIME));
}
