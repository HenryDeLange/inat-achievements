    // Achievement variables
// FIXME: See if I can find a way to not use a global variable for these...
    var dailyObsCount = 0;
    var dailySpeciesCount = [];
    var dailyLifeDate = new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate();
    var projectCount = [];
    var classCount = [];
    var flowerOrderCount = [];
    var alwaysOnOneDay = 24*60*60*1000;
    var alwaysOnDate = new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate();
    var alwaysOnCount = 0;
    var alwaysOnCountMax = 0;

    // SETUP THE ACHIEVEMENTS
// TODO: Move this into its own file, to make things cleaner
    var lstAchievementCardWrappers = [

        new AchievementCardData(
                "Life Lister",
                "???.",
                50,
                "icon-LifeLister",
                function(iNatObsJSON) {
                    if (iNatObsJSON.taxon.rank_level <= 10) {
                        return 1;
                    }
                    return 0;
                }
            ),

        new AchievementCardData(
                "Self Polinator",
                "???.",
                20,
                "icon-SelfPolinator",
                function(iNatObsJSON) {
                    for (var c = 0; c < iNatObsJSON.comments_count; c++) {
                        var comment = iNatObsJSON.comments[c];
                        if (comment.user.id === iNatObsJSON.user.id) {
                            return 1;
                        }
                    }
                    return 0;
                }
            ),

        new AchievementCardData(
                "Mammal Tryhard",
                "???.",
                3,
                "icon-TryMammals",
                function(iNatObsJSON) {
                    for (var t = 0; t < iNatObsJSON.taxon.ancestor_ids.length; t++) {
                        var taxonID = iNatObsJSON.taxon.ancestor_ids[t];
// FIXME: Should be: At least one observation of a swimming, flying and digging mammal
                        if ($.inArray(taxonID, [42478, 43253, 46927, 71384]) >= 0 // digging
                                || $.inArray(taxonID, [152871, 46306]) >= 0 // swimming
                                || $.inArray(taxonID, [40268]) >= 0) { // flying
                            return 1;
                        }
                    }
                    return 0;
                }
            ),

        new AchievementCardData(
                "Night Owl",
                "???.",
                5,
                "icon-NightOwl",
                function(iNatObsJSON) {
                    for (var t = 0; t < iNatObsJSON.taxon.ancestor_ids.length; t++) {
                        var taxonID = iNatObsJSON.taxon.ancestor_ids[t];
                        if ($.inArray(taxonID, [19350]) >= 0) {
                            return 1;
                        }
                    }
                    return 0;
                }
            ),

        new AchievementCardData(
                "King Fisher",
                "???.",
                8,
                "icon-KingFisher",
                function(iNatObsJSON) {
// FIXME: Instead I want to count all fish species observed in during a week period
                    for (var t = 0; t < iNatObsJSON.taxon.ancestor_ids.length; t++) {
                        var taxonID = iNatObsJSON.taxon.ancestor_ids[t];
                        if ($.inArray(taxonID, [47178]) >= 0) {
                            return 1;
                        }
                    }
                    return 0;
                }
            ),

        new AchievementCardData(
                "Daisy Town",
                "???.",
                20,
                "icon-DaisyTown",
                function(iNatObsJSON) {
                    for (var t = 0; t < iNatObsJSON.taxon.ancestor_ids.length; t++) {
                        var taxonID = iNatObsJSON.taxon.ancestor_ids[t];
                        if ($.inArray(taxonID, [47604]) >= 0) {
                            return 1;
                        }
                    }
                    return 0;
                }
            ),

        new AchievementCardData(
                "Heart Of The Matter",
                "???.",
                7,
                "icon-HeartOfTheMatter",
                function(iNatObsJSON) {
                    if (iNatObsJSON.taxon.threatened === true) {
                        return 1;
                    }
                    return 0;
                }
            ),

        new AchievementCardData(
                "Social Butterfly",
                "???.",
                30,
                "icon-SocialButterfly",
                function(iNatObsJSON) {
// TODO: figure out how to also use the social count here...
                    for (var t = 0; t < iNatObsJSON.taxon.ancestor_ids.length; t++) {
                        var taxonID = iNatObsJSON.taxon.ancestor_ids[t];
                        if ($.inArray(taxonID, [47224]) >= 0) {
                            return 1;
                        }
                    }
                    return 0;
                }
            ),

// TODO: Get a different criteria here, because of the new collection projects that aren't listed on the observations anymore...
        new AchievementCardData(
                "Group Therapy",
                "???.",
                55,
                "icon-GroupTherapy",
                function(iNatObsJSON) {
                    for (var t = 0; t < iNatObsJSON.project_ids.length; t++) {
                        if (!projectCount.includes(iNatObsJSON.project_ids[t])) {
                            projectCount.push(iNatObsJSON.project_ids[t]);
                            return 1;
                        }
                    }
                    return 0;
                }
            ),

        new AchievementCardData(
                "Name Giver",
                "???.",
                200,
                "icon-NameGiver",
                function(iNatObsJSON) {
// TODO: figure out how to use the ID count here...
                    return 0;
                }
            ),

        new AchievementCardData(
                "Daily Life",
                "???.",
                12,
                "icon-DailyLife",
                function(iNatObsJSON) {
// TODO: figure out how to do this one in the new single return way...
                    if (dailyLifeDate !== iNatObsJSON.observed_on_details.date) {
                        dailyLifeDate = iNatObsJSON.observed_on_details.date;
                        dailyObsCount = 0;
                        dailySpeciesCount = [];
                    }
                    if (dailyObsCountMax < ++dailyObsCount) {
                        dailyObsCountMax = dailyObsCount;
                    }
                    if (iNatObsJSON.taxon.rank_level <= 10) {
// FIXME: This is likely also counting subspecies, but the intent is only to count species...
                        if (!dailySpeciesCount.includes(iNatObsJSON.taxon.id)) {
                            dailySpeciesCount.push(iNatObsJSON.taxon.id);
                        }
                    }
                    if (dailySpeciesCountMax < dailySpeciesCount.length) {
                        dailySpeciesCountMax = dailySpeciesCount.length;
                    }
                    return 0;
                }
            ),

        new AchievementCardData(
                "Rat King",
                "???.",
                10,
                "icon-RatKing",
                function(iNatObsJSON) {
                    for (var t = 0; t < iNatObsJSON.taxon.ancestor_ids.length; t++) {
                        var taxonID = iNatObsJSON.taxon.ancestor_ids[t];
                        if ($.inArray(taxonID, [43698]) >= 0) {
                            return 1;
                        }
                    }
                    return 0;
                }
            ),

        new AchievementCardData(
                "Craney Storker",
                "???.",
                3,
                "icon-CraneyStorker",
                function(iNatObsJSON) {
                    for (var t = 0; t < iNatObsJSON.taxon.ancestor_ids.length; t++) {
                        var taxonID = iNatObsJSON.taxon.ancestor_ids[t];
                        if ($.inArray(taxonID, [3726, 23]) >= 0) {
                            return 1;
                        }
                    }
                    return 0;
                }
            ),

        new AchievementCardData(
                "So Many Bugs",
                "???.",
                5,
                "icon-TooManyBugs",
                function(iNatObsJSON) {
                    for (var t = 0; t < iNatObsJSON.taxon.ancestor_ids.length; t++) {
                        var taxonID = iNatObsJSON.taxon.ancestor_ids[t];
                        if ($.inArray(taxonID, [61267]) >= 0) {
                            return 1;
                        }
                    }
                    return 0;
                }
            ),

        new AchievementCardData(
                "Not A Bug",
                "???.",
                6,
                "icon-NotABug",
                function(iNatObsJSON) {
                    for (var t = 0; t < iNatObsJSON.taxon.ancestor_ids.length; t++) {
                        var taxonID = iNatObsJSON.taxon.ancestor_ids[t];
                        if ($.inArray(taxonID, [144128, 47119, 47158, 243773]) >= 0 && $.inArray(taxonID, [61267]) < 0) {
                            return 1;
                        }
                    }
                    return 0;
                }
            ),

        new AchievementCardData(
                "I Lichen Moss",
                "???.",
                7,
                "icon-LickenMoss",
                function(iNatObsJSON) {
                    for (var t = 0; t < iNatObsJSON.taxon.ancestor_ids.length; t++) {
                        var taxonID = iNatObsJSON.taxon.ancestor_ids[t];
                        if ($.inArray(taxonID, [311249, 54743]) >= 0) {
                            return 1;
                        }
                    }
                    return 0;
                }
            ),

        new AchievementCardData(
                "Toads and Toadstools",
                "???.",
                1,
                "icon-ToadsAndToadstools",
                function(iNatObsJSON) {
                    for (var t = 0; t < iNatObsJSON.taxon.ancestor_ids.length; t++) {
                        var taxonID = iNatObsJSON.taxon.ancestor_ids[t];
                        if ($.inArray(taxonID, [20979]) >= 0 || $.inArray(taxonID, [47169]) >= 0) {
                            return 1;
                        }
                    }
                    return 0;
                }
            ),

        new AchievementCardData(
                "Flower Child",
                "???.",
                11,
                "icon-FlowerChild",
                function(iNatObsJSON) {
                    for (var t = 0; t < iNatObsJSON.taxon.ancestor_ids.length; t++) {
                        var taxonID = iNatObsJSON.taxon.ancestor_ids[t];
                        if (iNatObsJSON.taxon.rank_level <= 40 && $.inArray(taxonID, [47125]) >= 0) {
                            if (!flowerOrderCount.includes(result.taxon.ancestor_ids[5])) {
                                flowerOrderCount.push(result.taxon.ancestor_ids[5]);
                                return 1;
                            }
                        }
                    }
                    return 0;
                }
            ),

        new AchievementCardData(
                "Classy Observer",
                "???.",
                15,
                "icon-WorldClass",
                function(iNatObsJSON) {
                    if (!classCount.includes(iNatObsJSON.taxon.iconic_taxon_id)) {
                        classCount.push(iNatObsJSON.taxon.iconic_taxon_id);
                        return 1;
                    }
                    return 0;
                }
            ),

        new AchievementCardData(
                "Always On",
                "???.",
                3,
                "icon-AlwaysOn",
                function(iNatObsJSON) {
// TODO: figure out how to do these in the new way...
                    var date1 = new Date(alwaysOnDate.substr(0, 4), 
                                         alwaysOnDate.substr(5, 2), 
                                         alwaysOnDate.substr(8, 2));
                    var date2 = new Date(iNatObsJSON.observed_on_details.date.substr(0, 4), 
                                         iNatObsJSON.observed_on_details.date.substr(5, 2), 
                                         iNatObsJSON.observed_on_details.date.substr(8, 2));
                    if (Math.round(Math.abs(date1.getTime() - date2.getTime()) / alwaysOnOneDay) > 3) {
                        alwaysOnCount = 0;
                    }
                    if (alwaysOnDate !== iNatObsJSON.observed_on_details.date) {
                        alwaysOnCount++;
                        alwaysOnDate = iNatObsJSON.observed_on_details.date;
                    }
                    if (alwaysOnCountMax < alwaysOnCount) {
                        alwaysOnCountMax = alwaysOnCount;
                    }
                    return 0;
                }
            )

    ];