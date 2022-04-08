import { Dispatch } from '@reduxjs/toolkit';
import inatjs from 'inaturalistjs';
import { setProgressLoading, setProgressMessage, setProgressValue } from '../redux/slices/ProgressSlice';
import { Observation, ObservationsResponse } from '../types/iNaturalistTypes';

const RESULT_PER_PAGE_LIMIT = 200; // 200 seems to be the maximum iNat wants
const REQUEST_PER_MINUTE_LIMIT = 60; // 100 seems to be the maximum iNat wants
const THROTTLE_SLEEP_TIME = 60 * 1000 / REQUEST_PER_MINUTE_LIMIT;
const TOTAL_RESULTS_LIMIT = REQUEST_PER_MINUTE_LIMIT * RESULT_PER_PAGE_LIMIT; // Default to one minute of loading data (the top 500 observers seems to have 15000+ observations)
const FIRST_PAGE = 1; // 1 is the first page (not 0)

const printLog = false;

export async function calculateAchievements(
    dispatch: Dispatch<any>,
    username: string,
    callback: (observation: Observation) => void,
    page = FIRST_PAGE,
    totalResults = 0,
    readLimit = TOTAL_RESULTS_LIMIT,
    resultCount = 0
) {
    printLog && console.log('calculateAchievements: BEGIN', username, '| page=', page, '| total=', totalResults, '| limit=', readLimit);
    // Sleep for a bit before starting (to comply with the iNat requests per minute limit)
    printLog && console.log('calculateAchievements: rest for', THROTTLE_SLEEP_TIME, 'ms');
    dispatch(setProgressMessage('Giving the iNaturalist server a brief rest...'));
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
        dispatch(setProgressMessage(`Fetching the next ${params.per_page} observations from iNaturalist...`));
        inatjs.observations.search(params)
            .then((observationsResponse: ObservationsResponse) => {
                printLog && console.log('calculateAchievements: found ', observationsResponse.results.length ?? 0, ' results to evaluate');
                totalResults = observationsResponse.total_results!;
                dispatch(setProgressMessage(`Calculating the next Wild Achievements from the next ${observationsResponse.results.length ?? 0} observations...`));
                for (let observation of observationsResponse.results) {
                    callback(observation);
                    resultCount++;
                    dispatch(setProgressValue(resultCount / Math.min(totalResults, readLimit) * 100));
                }
                calculateAchievements(dispatch, username, callback, page + 1, totalResults, readLimit, resultCount);
                printLog && console.log('calculateAchievements: promise completed', username, '| page=', page);
            })
            .catch((e: any) => console.log('Failed observations search:', e));
    }
    else {
        printLog && console.log('calculateAchievements: don\'t fetch any more data (processed', Math.min(page * RESULT_PER_PAGE_LIMIT, readLimit), 'results)');
        dispatch(setProgressMessage(`Wild Achievements for ${username} have been calculated, using the ${resultCount} most recent observations from iNaturalist!`));
        dispatch(setProgressValue(100));
        dispatch(setProgressLoading(false));
    }
    printLog && console.log('calculateAchievements: END', username, '| page=', page, '| total=', totalResults, '| limit=', readLimit);
}
