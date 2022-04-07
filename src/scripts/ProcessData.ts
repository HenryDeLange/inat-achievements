import { Dispatch } from '@reduxjs/toolkit';
import inatjs from 'inaturalistjs';
import { setProgressLoading, setProgressValue } from '../redux/slices/ProgressSlice';
import { Observation, ObservationsResponse } from '../types/iNaturalistTypes';

// TODO: Implement requests per minute limit
const REQUEST_PER_MINUTE_LIMIT = 100; // 100 seems to be the maximum iNat wants
const TOTAL_RESULTS_LIMIT = 500;
const RESULT_PER_PAGE_LIMIT = 200; // 200 seems to be the maximum iNat wants
const FIRST_PAGE = 1; // 1 is the first page (not 0)

// TODO: Update the Alert with the loading progress ("fetching more", "processing", "stopped processing due to limit")
export function calculateAchievements(dispatch: Dispatch<any>, username: string, callback: (observation: Observation) => void, page = FIRST_PAGE, totalResults = 0, readLimit = TOTAL_RESULTS_LIMIT) {
    console.log('calculateAchievements: BEGIN', username, '| page=', page, '| total=', totalResults, '| limit=', readLimit);
    const params = {
        user_id: username,
        per_page: RESULT_PER_PAGE_LIMIT, 
        page: page,
        order_by: 'observed_on'
    }
    if (page * RESULT_PER_PAGE_LIMIT > readLimit) {
        params.per_page = Math.max(0, readLimit - ((page - 1) * RESULT_PER_PAGE_LIMIT));
        console.log('calculateAchievements: adjusting per_page to', params.per_page, 'due to read limit');
    }
    if (page === 1 || (params.per_page > 0 && ((page - 1) * RESULT_PER_PAGE_LIMIT + params.per_page) <= Math.min(totalResults, readLimit))) {
        console.log('calculateAchievements: search for', username, 'page', page);
        let count = 0;
        inatjs.observations.search(params)
            .then((observationsResponse: ObservationsResponse) => {
                console.log('calculateAchievements: found ', observationsResponse.results.length ?? 0, ' results to evaluate');
                totalResults = observationsResponse.total_results!;
                for (let observation of observationsResponse.results) {
                    callback(observation);
                    dispatch(setProgressValue(((page - 1) * RESULT_PER_PAGE_LIMIT + count++) / Math.min(totalResults, readLimit) * 100));
                }
                calculateAchievements(dispatch, username, callback, page + 1, totalResults, readLimit);
            })
            .catch((e: any) => console.log('Failed observations search:', e));
    }
    else {
        console.log('calculateAchievements: don\'t fetch any more data (processed', Math.min(page * RESULT_PER_PAGE_LIMIT, readLimit), 'results)');
        dispatch(setProgressValue(100));
        dispatch(setProgressLoading(false));
    }
    console.log('calculateAchievements: END', username, '| page=', page, '| total=', totalResults, '| limit=', readLimit);
}
