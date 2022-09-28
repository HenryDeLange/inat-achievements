import { Dispatch } from '@reduxjs/toolkit';
import I18n from 'i18n-js';
import inatjs from 'inaturalistjs';
import { updateAchievement } from '../redux/slices/AchievementsSlice';
import { setProgressAlert, setProgressLoading, setProgressMessage, setProgressValue } from '../redux/slices/ProgressSlice';
import { Observation, ObservationsResponse } from '../types/iNaturalistTypes';
import { getAchievements } from './AchievementImplementations';
import getTaxonRank from './achievements/utils/TaxonCache';

// 200 seems to be the maximum iNat wants
const RESULT_PER_PAGE_LIMIT = 200;

// 100 seems to be the maximum iNat wants (the time taken for iNat to respond results in this being effectively less than the specified value)
// The TaxonCache also floods iNat (initially) so it's best to keep this number low
const REQUEST_PER_MINUTE_LIMIT = 60;

const THROTTLE_SLEEP_TIME = 60 * 1000 / REQUEST_PER_MINUTE_LIMIT;
const TOTAL_RESULTS_LIMIT = REQUEST_PER_MINUTE_LIMIT * RESULT_PER_PAGE_LIMIT; // Default to one minute of loading data (the top 500 observers seems to have 15000+ observations)
const FIRST_PAGE = 1; // 1 is the first page (not 0)

const printLog = true;

export async function calculateAchievements(
    dispatch: Dispatch<any>,
    username: string,
    readLimit = TOTAL_RESULTS_LIMIT,
    page = FIRST_PAGE,
    totalResults = -1,
    resultCount = 0
) {
    printLog && console.log('calculateAchievements: BEGIN', username, '| page=', page, '| total=', totalResults, '| limit=', readLimit);
    // Sleep for a bit before starting (to comply with the iNat requests per minute limit)
    printLog && console.log('calculateAchievements: rest for', THROTTLE_SLEEP_TIME, 'ms');
    dispatch(setProgressMessage(I18n.t('progressSleep')));
    await new Promise(resolve => setTimeout(resolve, THROTTLE_SLEEP_TIME));
    // Request data from iNat
    const params = {
        user_id: username,
        per_page: RESULT_PER_PAGE_LIMIT,
        page: page,
        order_by: 'observed_on', // Sort by observation date (descending by default)
        captive: false, // Only wild observations
        verifiable: true // Exclude casual observations
    }
    if (page * RESULT_PER_PAGE_LIMIT > readLimit) {
        params.per_page = Math.max(0, readLimit - ((page - 1) * RESULT_PER_PAGE_LIMIT));
        printLog && console.log('calculateAchievements: adjusting per_page to', params.per_page, 'due to read limit');
    }
    if (page === 1 || (params.per_page > 0 && ((page - 1) * RESULT_PER_PAGE_LIMIT + params.per_page) <= Math.min(totalResults, readLimit))) {
        printLog && console.log('calculateAchievements: search for', username, 'page', page);
        dispatch(setProgressMessage(I18n.t('progressFetching', { per_page: params.per_page, count: resultCount, total: totalResults < 0 ? '?' : Math.min(totalResults, readLimit) })));
        inatjs.observations.search(params)
            .then((observationsResponse: ObservationsResponse) => {
                printLog && console.log('calculateAchievements: found ', observationsResponse.results.length ?? 0, ' results to prepare');
                dispatch(setProgressMessage(I18n.t('progressCalculating', { per_page: observationsResponse.results.length ?? 0 })));
                for (let observation of observationsResponse.results) {
                    prepare(observation);
                }
                printLog && console.log('calculateAchievements: found ', observationsResponse.results.length ?? 0, ' results to evaluate');
                totalResults = observationsResponse.total_results!;
                dispatch(setProgressMessage(I18n.t('progressCalculating', { per_page: observationsResponse.results.length ?? 0 })));
                const achievements = getAchievements();
                for (let observation of observationsResponse.results) {
                    for (let achievementData of achievements) {
                        achievementData.evaluate(observation);
                        dispatch(updateAchievement({ ...achievementData, evalFunc: undefined, resetFunc: undefined }));
                    }
                    resultCount++;
                    dispatch(setProgressValue(resultCount / Math.min(totalResults, readLimit) * 100));
                }
                calculateAchievements(dispatch, username, readLimit, page + 1, totalResults, resultCount);
                printLog && console.log('calculateAchievements: promise completed', username, '| page=', page);
            })
            .catch((e: any) => console.error('Failed observations search:', e));
    }
    else {
        printLog && console.log('calculateAchievements: don\'t fetch any more data (processed', Math.min(page * RESULT_PER_PAGE_LIMIT, readLimit), 'results)');
        dispatch(setProgressMessage(I18n.t('progressDone', { user: username, count: resultCount })));
        dispatch(setProgressValue(100));
        dispatch(setProgressLoading(false));
        dispatch(setProgressAlert(true));
    }
    printLog && console.log('calculateAchievements: END', username, '| page=', page, '| total=', totalResults, '| limit=', readLimit);
}

function prepare(observation: Observation) {
    if (observation?.taxon?.ancestor_ids && observation.taxon.ancestor_ids.length > 2) {
        const relevantAncestors = observation.taxon.ancestor_ids.slice(2, Math.min(7, observation.taxon.ancestor_ids.length));
        for (let taxonID of relevantAncestors) {
            getTaxonRank(taxonID);
        }
    }
}
