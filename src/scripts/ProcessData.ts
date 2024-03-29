import { Dispatch } from '@reduxjs/toolkit';
import I18n from 'i18n-js';
import inatjs from 'inaturalistjs';
import { setAllAchievementData } from '../redux/slices/AchievementsSlice';
import { setProgressAlert, setProgressLoading, setProgressMessage, setProgressValue } from '../redux/slices/ProgressSlice';
import { AchievementDataType, TaxonRankCacheType } from '../types/AchievementsTypes';
import { ObservationsResponse, TaxaShowResponse } from '../types/iNaturalistTypes';
import { getTaxonRank, populateTaxonRank } from './achievements/utils/TaxonCache';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import worker from 'workerize-loader!./workers/worker';
import { splitArrayIntoChunks } from './achievements/utils';

// 200 seems to be the maximum iNat wants
const RESULT_PER_PAGE_LIMIT = 200;

// 100 seems to be the maximum iNat wants (the time taken for iNat to respond results in this being effectively less than the specified value)
// The TaxonCache also floods iNat (initially) so it's best to keep this number low
const REQUEST_PER_MINUTE_LIMIT = 70;

const THROTTLE_SLEEP_TIME = Math.round(60 * 1000 / REQUEST_PER_MINUTE_LIMIT);

// The iNat API cuts off pagination when 10 000 records have been fetched (due to database concerns),
// they suggest to  rather try to change the query parameters (for example using id_above, etc.) instead of performing excessive pagination
const QUERY_PARAMS_ROTATE_LIMIT = RESULT_PER_PAGE_LIMIT * 10;

// 1 is the first page (not 0)
const FIRST_PAGE = 1;

const MAX_LIMIT = 99999;

const MAX_TAXA_TO_LOAD_AT_ONCE = 30;

// Flag to turn detailed logging on/off
const PRINT_LOG = false;

// Setup Web Worker
const workerInstance = worker();

export async function resetAchievements(dispatch: Dispatch<any>) {
    PRINT_LOG && console.log(`[RESET]: BEGIN`)
    workerInstance.reset()
        .then(async (evaluatedAchievementData: AchievementDataType[]) => {
            PRINT_LOG && console.log(`[RESET]: END`);
            dispatch(setAllAchievementData(evaluatedAchievementData));
        });
}

declare type CalcState = {
    queryPage: number,
    queryDate: string,
    queryResultsProcessed: number,
    resultsProcessed: number,
    resultsTotal: number,
    activeDate: string,
    activeDateObservations: number[]
}

export async function calculateAchievements(
    dispatch: Dispatch<any>,
    username: string,
    limit: number = MAX_LIMIT,
    calcState: CalcState = {
        queryPage: FIRST_PAGE,
        queryDate: new Date().toISOString().split('T')[0],
        queryResultsProcessed: 0,
        resultsProcessed: 0,
        resultsTotal: -1,
        activeDate: new Date().toISOString().split('T')[0],
        activeDateObservations: []
    }
) {
    if (limit <= 0)
        limit = MAX_LIMIT;
    PRINT_LOG && console.log(`[calc]: BEGIN 
        | user=${username}
        | queryPage=${calcState.queryPage}
        | queryDate=${calcState.queryDate}
        | queryResultsProcessed=${calcState.queryResultsProcessed}
        | limit=${limit}
        | resultsProcessed=${calcState.resultsProcessed}
        | resultsTotal=${calcState.resultsTotal}
        | activeDate=${calcState.activeDate}
        | activeDateObservations=${calcState.activeDateObservations.length}`);
    // Sleep for a bit before starting (to comply with the iNat requests per minute limit)
    await sleep();
    // Prepare fetch parameters
    const iNatParams = {
        user_id: username,
        per_page: RESULT_PER_PAGE_LIMIT,
        page: calcState.queryPage,
        d2: calcState.queryDate, // Observed on or before this date
        order_by: 'observed_on', // Sort by observation date (descending by default)
        captive: false, // Only wild observations
        verifiable: true // Exclude casual observations
    }
    // Adjust per_page if it will result in the read limit being exceeded
    if (limit > 0) {
        if (calcState.resultsProcessed + iNatParams.per_page > limit) {
            iNatParams.per_page = Math.max(0, limit - calcState.resultsProcessed);
            iNatParams.per_page > 0
                && PRINT_LOG && console.log(`[calc]: adjusting records per page to ${iNatParams.per_page}, in order not to exceed the read limit of ${limit}`);
        }
    }
    // Adjust per_page if it will result in the total observations being exceeded
    if (calcState.queryPage > FIRST_PAGE) {
        if (calcState.resultsProcessed + iNatParams.per_page > calcState.resultsTotal) {
            iNatParams.per_page = calcState.resultsTotal - calcState.resultsProcessed;
            iNatParams.per_page > 0
                && PRINT_LOG && console.log(`[calc]: adjusting records per page to ${iNatParams.per_page}, in order not to exceed the number of observations of ${calcState.resultsTotal}`);
        }
    }
    // Adjust d2 (from data) when more than QUERY_PARAMS_ROTATE_LIMIT number of records have been read
    if (iNatParams.per_page > 0) {
        if (calcState.queryResultsProcessed >= QUERY_PARAMS_ROTATE_LIMIT) {
            if (calcState.activeDate !== calcState.queryDate) {
                PRINT_LOG && console.log(`[calc]: adjusting the query date from ${calcState.queryDate} to ${calcState.activeDate}, in order to avoid paging past ${QUERY_PARAMS_ROTATE_LIMIT} records`);
                calcState.queryDate = calcState.activeDate;
                calcState.queryPage = FIRST_PAGE;
                calcState.queryResultsProcessed = 0;
                iNatParams.d2 = calcState.queryDate;
                iNatParams.page = calcState.queryPage;
            }
            else {
                console.warn(`There are more than ${QUERY_PARAMS_ROTATE_LIMIT} observations on ${calcState.activeDate}. An attempt will be made to load more observations, but it may fail...`);
            }
        }
    }
    // Fetch the data from iNaturalist
    if (iNatParams.per_page > 0
        && (calcState.queryPage === FIRST_PAGE || (calcState.resultsProcessed + iNatParams.per_page) <= Math.min(calcState.resultsTotal, limit))) {
        // Update the UI
        PRINT_LOG && console.log(`[calc]: fetch data for: user=${username} | queryPage=${calcState.queryPage} | queryDate=${calcState.queryDate}`);
        dispatch(setProgressMessage(I18n.t('progressFetching', {
            per_page: iNatParams.per_page,
            count: calcState.resultsProcessed,
            total: calcState.resultsTotal < 0 ? I18n.t('progressUnknown') : Math.min(calcState.resultsTotal, limit)
        })));
        // Fetch and process the next batch of observations
        await fetchAndProcessObservations(dispatch, username, limit, iNatParams, calcState);
    }
    else {
        // All data has been fetched, update the UI accordingly
        PRINT_LOG && console.log('[calc]: don\'t fetch any more data (processed', Math.min(calcState.resultsProcessed, limit), 'results)');
        dispatch(setProgressMessage(I18n.t('progressDone', { user: username, count: calcState.resultsProcessed })));
        dispatch(setProgressValue(100));
        dispatch(setProgressLoading(false));
        dispatch(setProgressAlert(true));
    }
    PRINT_LOG && console.log(`[calc]: END 
        | user=${username}
        | queryPage=${calcState.queryPage}
        | queryDate=${calcState.queryDate}
        | queryResultsProcessed=${calcState.queryResultsProcessed}
        | limit=${limit}
        | resultsProcessed=${calcState.resultsProcessed}
        | resultsTotal=${calcState.resultsTotal}
        | activeDate=${calcState.activeDate}
        | activeDateObservations=${calcState.activeDateObservations.length}`);
}

async function fetchAndProcessObservations(
    dispatch: Dispatch<any>,
    username: string,
    readLimit: number,
    iNatParams: any,
    calcState: CalcState
) {
    inatjs.observations.search(iNatParams)
        .then(async (observationsResponse: ObservationsResponse) => {
            // Cache Taxon Ranks
            await cacheTaxonRanks(dispatch, observationsResponse)
                .then(taxonRanks => {
                    // Evaluate Observations
                    calcState.resultsTotal = Math.max(calcState.resultsTotal, observationsResponse.total_results!);
                    PRINT_LOG && console.log(`[calc]: found ${observationsResponse.results.length ?? 0} results to evaluate | ${calcState.resultsTotal} in total`);
                    dispatch(setProgressMessage(I18n.t('progressCalculating', { per_page: observationsResponse.results.length ?? 0 })));
                    let obsToEvaluate = observationsResponse.results;
                    if (calcState.activeDateObservations.length > 0) {
                        obsToEvaluate = observationsResponse.results.filter((observation) => {
                            for (let alreadyProcessed of calcState.activeDateObservations) {
                                if (observation.id === alreadyProcessed) {
                                    PRINT_LOG && console.log(`[calc]: don't reprocess observation ${alreadyProcessed}`);
                                }
                            }
                            return true;
                        });
                    }
                    workerInstance.evaluate(obsToEvaluate, taxonRanks)
                        .then(async (evaluatedAchievementData: AchievementDataType[]) => {
                            PRINT_LOG && console.log(`[calc]: web worker is done evaluating ${observationsResponse.results.length} observations`);
                            calcState.queryResultsProcessed = calcState.queryResultsProcessed + obsToEvaluate.length;
                            calcState.resultsProcessed = calcState.resultsProcessed + obsToEvaluate.length;
                            // Update the achievement cards' data
                            dispatch(setAllAchievementData(evaluatedAchievementData));
                            // Update the progress bar
                            dispatch(setProgressValue(calcState.resultsProcessed / Math.min(calcState.resultsTotal, readLimit) * 100));
                            // Keep track of the most recent active date and already processed observations
                            calcState.activeDate = observationsResponse.results[observationsResponse.results.length - 1].observed_on!;
                            calcState.activeDateObservations = [];
                            for (let observation of observationsResponse.results) {
                                if (observation.observed_on === calcState.activeDate) {
                                    calcState.activeDateObservations.push(observation.id!);
                                }
                            }
                            // Recursively fetch and process the next set of observations
                            PRINT_LOG && console.log(`[calc]: preparing to fetch the next observations...`);
                            calcState.queryPage++;
                            calculateAchievements(dispatch, username, readLimit, calcState);
                        });
                    PRINT_LOG && console.log(`[calc]: iNat fetch is done for: user=${username} | queryPage=${calcState.queryPage} | queryDate=${calcState.queryDate}`);
                });
        })
        .catch((e: any) => console.error('Failed observations search:', e));
}

async function cacheTaxonRanks(
    dispatch: Dispatch<any>,
    observationsResponse: ObservationsResponse
): Promise<TaxonRankCacheType[]> {
    PRINT_LOG && console.log(`[taxa-cache]: check the taxon rank cache for ${observationsResponse.results.length ?? 0} observations...`);
    dispatch(setProgressMessage(I18n.t('progressPreparing')));
    const ranks: TaxonRankCacheType[] = [];
    const uniqueAncestorTaxonIDs: number[] = [];
    const taxaToLoadRankFor: number[] = [];
    for (let observation of observationsResponse.results) {
        if (observation?.taxon?.ancestor_ids && observation.taxon.ancestor_ids.length > 2) {
            const relevantAncestors = observation.taxon.ancestor_ids.slice(2, Math.min(7, observation.taxon.ancestor_ids.length));
            for (let taxonID of relevantAncestors) {
                if (uniqueAncestorTaxonIDs.indexOf(taxonID) < 0) {
                    uniqueAncestorTaxonIDs.push(taxonID);
                    let rank = getTaxonRank(taxonID);
                    if (rank) {
                        ranks.push({ taxonID, rank });
                    }
                    else {
                        taxaToLoadRankFor.push(taxonID);
                    }
                }
            }
        }
    }
    const taxaChunks = splitArrayIntoChunks(taxaToLoadRankFor, MAX_TAXA_TO_LOAD_AT_ONCE);
    for (let taxaChunk of taxaChunks) {
        await sleep();
        PRINT_LOG && console.log(`[taxa-cache]: fetch the rank for taxa ${taxaChunk}`);
        await inatjs.taxa.fetch(taxaChunk)
            .then((taxaResponse: TaxaShowResponse) => {
                if (taxaResponse.total_results ?? -1 > 0) {
                    for (let taxon of taxaResponse.results) {
                        if (taxon && taxon.rank_level) {
                            PRINT_LOG && console.log(`[taxa-cache]: cache the rank ${taxon.rank_level} for taxon ${taxon.id}`);
                            populateTaxonRank(taxon.id, taxon.rank_level);
                            ranks.push({ taxonID: taxon.id, rank: taxon.rank_level });
                        }
                        else
                            console.error(`Could not access rank for taxa ${taxaChunk}`);
                    }
                }
                else
                    console.error(`Could not cache rank for taxa ${taxaChunk}`);
            });
    }
    return ranks;
}

async function sleep() {
    PRINT_LOG && console.log(`[SLEEP]: ... ... resting for ${THROTTLE_SLEEP_TIME}ms ... ...`);
    await new Promise(resolve => setTimeout(resolve, THROTTLE_SLEEP_TIME));
}
