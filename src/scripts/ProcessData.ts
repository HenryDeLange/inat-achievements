// The active user name
let activeUserName = '';
let readLimit = 300;

export function calculateAchievements() {
    // document.getElementById('PanelAchievements')!.style.display = '';
    // document.getElementById('PanelLoading')!.style.display = '';
    // setTimeout(loadUserData, 0);
    console.log('calculateAchievements');
}

// Load the user's data
function loadUserData() {
    
// TODO: Don't do subsequent button presses while the first press is still busy processing?

    // Do basic validation
    var feedback = document.getElementById('PanelFeedback');
    activeUserName = (document.getElementById('username') as HTMLInputElement)!.value;
    if (!activeUserName) {
        feedback!.innerHTML = 'Please provide an iNaturalist username.';
        feedback!.style.display = '';
        document.getElementById('PanelLoading')!.style.display = 'none';
        document.getElementById('PanelAchievements')!.style.display = 'none';
        return;
    }
    else {
        feedback!.innerHTML = '';
        feedback!.style.display = 'none';
    }
    // // Clear the old global state variables
    // clearGlobalState();
    // // Setup the list of achievements
    // setupAchievementsList();
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

// function fetchUserInfo() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             var data = JSON.parse(this.responseText);
//             idCount = data.results[0].identifications_count;
//             socialCount = data.results[0].activity_count;
//         }
//     };
//     xhttp.open('GET', 
//                 'https://api.inaturalist.org/v1/users/' + activeUserName, 
//                 false); // 'False' to indicate synchronous
//     xhttp.send();
//     console.log('Loaded user data');
// }

// function fetchTotalRecordCount(feedback) {
//     var totalRecords = 0;
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             var data = JSON.parse(this.responseText);
//             totalRecords = data.total_results;
//         }
//     };
//     xhttp.open('GET', 
//                 'https://api.inaturalist.org/v1/observations?user_id=' + activeUserName 
//                         + '&per_page=1&page=1&order=desc&order_by=created_at', 
//                 false); // 'False' to indicate synchronous
//     xhttp.send();
//     console.log('Total Records = ' + totalRecords);
//     // Do validation
//     if (totalRecords === 0) {
//         feedback.innerHTML = 'No observations were found for the provided username.';
//         feedback.style.display = '';
//         document.getElementById('PanelLoading').style.display = 'none';
//         document.getElementById('PanelAchievements').style.display = 'none';
//         return;
//     }
//     else {
//         feedback.innerHTML = '';
//         feedback.style.display = 'none';
//     }
//     // NOTE: Stopping processing after 2000 (default) records to prevent too many unneccessary calls to the iNat servers...
//     if (totalRecords > readLimit) {
//         console.log('Limiting Records to ' + readLimit);
//         totalRecords = readLimit;
//         feedback.innerHTML = 'Only the ' + readLimit + ' most recent observations were used.';
//         feedback.style.display = '';
//     }
//     else {
//         feedback.innerHTML = '';
//         feedback.style.display = 'none';
//     }
//     return totalRecords;
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
