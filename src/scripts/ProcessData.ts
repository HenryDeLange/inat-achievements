import { Dispatch } from '@reduxjs/toolkit';
import inatjs from 'inaturalistjs';
import { setProgressLoading, setProgressValue } from '../redux/slices/ProgressSlice';
import { Observation, ObservationsResponse } from '../types/iNaturalistTypes';

// TODO: Implement requests per minute limit
const REQUEST_PER_MINUTE_LIMIT = 100; // 100 seems to be the maximum iNat wants
const TOTAL_RESULTS_LIMIT = 500;
const RESULT_PER_PAGE_LIMIT = 200; // 200 seems to be the maximum iNat wants
const FIRST_PAGE = 1; // 1 is the first page (not 0)

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

// Load the user's data
function loadUserData() {
    
// TODO: Don't do subsequent button presses while the first press is still busy processing?

    // Do basic validation
    // var feedback = document.getElementById('PanelFeedback');
    // activeUserName = (document.getElementById('username') as HTMLInputElement)!.value;
    // if (!activeUserName) {
    //     feedback!.innerHTML = 'Please provide an iNaturalist username.';
    //     feedback!.style.display = '';
    //     document.getElementById('PanelLoading')!.style.display = 'none';
    //     document.getElementById('PanelAchievements')!.style.display = 'none';
    //     return;
    // }
    // else {
    //     feedback!.innerHTML = '';
    //     feedback!.style.display = 'none';
    // }
    // Clear the old global state variables
    // clearGlobalState();
    // Setup the list of achievements
    // initAchievementsData();
    // // Load the user data
    // fetchUserInfo();
    // // Load the observation data
    // var totalRecords = fetchTotalRecordCount(feedback);
    // // Update progress bar
    // setTimeout(setProgress(0), 0);
    // // Load the observation records
    // setTimeout(fetchObservations(totalRecords), 0);
}

// // Process a page of data that has been fetched from iNaturalist
// function processDataPage(response, page, perPage, totalRecords) {
//     // Process data
//     var data = JSON.parse(response);
//     var arrayLength = data.results.length;
//     // LOOP OVER OBSERVATIONS
//     for (var i = 0; i < arrayLength && (((page - 1) * perPage) + i ) < totalRecords; i++) {
//         var result = data.results[i];
//         // Give each achievement a chance to evaluate for the iNat observation
//         for (var t = 0; t < lstAchievementCardWrappers.length; t++) {
//             lstAchievementCardWrappers[t].evaluate(result);
//         }
//         // Update progress bar
//         var percentVal = Math.floor((((page - 1) * perPage) + i) / totalRecords * 100);
//         //console.log('Progress: ' + percentVal + '%')
//         setTimeout(setProgress(percentVal), 0); // Makes the function run asynchronously
//     }
// }

// function fetchObservations(totalRecords) {
//     // Process the pages
//     var perPage = 50;
//     var page = 0; // NOTE: The first page seems to start at 1 (0 gives an error), so increase the page before the first load

// // TODO: Find a way to throttle this to not exceed the iNat limit (around 60 requests per minute, 100 max)
// // TODO: Maybe improve this to load the data async and show updated achievements as the processing progresses?

//     let donePagesCount = 0;
//     var pagesToRead = Math.ceil(totalRecords / perPage);
//     do {
//         page++; // Move to the next page
//         var xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function() {
//             if (this.readyState == 4 && this.status == 200) {
//                 donePagesCount++;
//                 setTimeout(processDataPage(this.responseText, donePagesCount, perPage, totalRecords), 0);
//                 console.log('Loaded Page ' + donePagesCount + ' of ' + pagesToRead);
//                 // If this was the last page, then hide the progress bar and show the achievements
//                 if (donePagesCount >= pagesToRead) {
//                     // Process the loaded data
//                     console.log('Last page loaded, showing results...');
//                     // Update progress bar
//                     $('.progress-bar').css('width', '100%').attr('aria-valuenow', '100%').text('100%');
//                     $('#progressDetails').text('Done! :)');
//                     // Hide the loading progress bar
//                     setTimeout(() => {document.getElementById('PanelLoading').style.display = 'none'}, 2500);
//                     // Show the achievements
//                     showAchievements();
//                 }
//             }
//         };
//         xhttp.open('GET', 
//                     'https://api.inaturalist.org/v1/observations?user_id=' + activeUserName 
//                             + '&per_page=' + perPage + '&page=' + page 
//                             + '&order=desc&order_by=observed_on', // Needs to be ordered by date to make some of the calculations easier
// //                        false); // 'False' to indicate synchronous
//                     true); // 'true' to allow async processing
//         xhttp.send();
//     } 
//     while (page < pagesToRead);
// }

// // Update the progres bar
// function setProgress(percentVal) {
//     $('.progress-bar').css('width', percentVal+ '%').attr('aria-valuenow', percentVal+ '%').text(percentVal+ '%');
//     $('#progressDetails').text('Fetching more data...');
// }
