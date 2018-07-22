    // The array of achievements
    var lstAchievementCardWrappers = [];
    
// FIXME: See if I can find a better way to do this that does not use so many global variables...
    var alltimeSpeciesCount = [];
    var dailyObsCount = 0;
    var dailyObsCountMax = 0;
    var dailySpeciesCountMax = 0;
    var dailySpeciesCount = [];
    var dailyLifeDate = new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate();
    var dailyLifeDatePrev = null;
    var projectCount = [];
    var classCount = [];
    var flowerOrderCount = [];
    var alwaysOnOneDay = 24*60*60*1000;
    var alwaysOnDate = new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate();
    var alwaysOnCount = 0;
    var alwaysOnCountMax = 0;
    var idCount = 0;
    var socialCount = 0;
    var mammalDig = 0;
    var mammalSwim = 0;
    var mammalFly = 0;
    var mammalThree = 0;
    
    
    function clearGlobalState() {
        alltimeSpeciesCount = [];
        dailyObsCount = 0;
        dailyObsCountMax = 0;
        dailySpeciesCountMax = 0;
        dailySpeciesCount = [];
        dailyLifeDate = new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate();
        dailyLifeDatePrev = null;
        projectCount = [];
        classCount = [];
        flowerOrderCount = [];
        alwaysOnOneDay = 24*60*60*1000;
        alwaysOnDate = new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate();
        alwaysOnCount = 0;
        alwaysOnCountMax = 0;
        idCount = 0;
        socialCount = 0;
        mammalDig = 0;
        mammalSwim = 0;
        mammalFly = 0;
        mammalThree = 0;
    }

// TODO: In the future add different levels for the goals (for example: "observer 5/15/40 frogs")

    // SETUP THE ACHIEVEMENTS
    function setupAchievementsList() {
        lstAchievementCardWrappers = [

            new AchievementCardData(
                    "Life Lister",
                    "Observe 500+ different species.",
                    500,
                    "icon-LifeLister",
                    function(iNatObsJSON) {
                        for (var t = 0; t < iNatObsJSON.taxon.ancestor_ids.length; t++) {
                            if (iNatObsJSON.taxon.rank_level === 10) {
                                if (!alltimeSpeciesCount.includes(iNatObsJSON.taxon.id)) {
                                    alltimeSpeciesCount.push(iNatObsJSON.taxon.id);
                                    return 1;
                                }
                            }
                            if (iNatObsJSON.taxon.rank_level < 10) {
// FIXME? Might not work for observations with lower than subspecies IDs...?
                                if (!alltimeSpeciesCount.includes(iNatObsJSON.taxon.parent_id)) {
                                    alltimeSpeciesCount.push(iNatObsJSON.taxon.parent_id);
                                    return 1;
                                }
                            }
                        }
                        return 0;
                    }
                ),

            new AchievementCardData(
                    "Self Polinator",
                    "Add 50+ comments to your own observations.",
                    50,
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
                    "Obtain 3+ observations for flying, swimming and digging mammals.",
                    3,
                    "icon-TryMammals",
                    function(iNatObsJSON) {
                        for (var t = 0; t < iNatObsJSON.taxon.ancestor_ids.length; t++) {
                            var taxonID = iNatObsJSON.taxon.ancestor_ids[t];
                            // digging
                            if ($.inArray(taxonID, [42478, 43253, 46927, 71384]) >= 0) {
                                mammalDig++;
                            }
                            // swimming
                            if ($.inArray(taxonID, [152871, 46306]) >= 0) {
                                mammalSwim++;
                            }
                            // flying
                            if ($.inArray(taxonID, [40268]) >= 0) {
                                mammalFly++;
                            }
                        }
                        if (mammalDig > mammalThree && mammalSwim > mammalThree && mammalFly > mammalThree) {
                            mammalThree++;
                            if (mammalThree <= 3) {
                                return 1;
                            }
                        }
                        return 0;
                    }
                ),

            new AchievementCardData(
                    "Night Owl",
                    "Obtain 12+ owl observations.",
                    12,
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

// TODO: Instead I want to count all fish species observed in during a week period
            new AchievementCardData(
                    "King Fisher",
                    "Obtain 20+ fish observations.",
                    20,
                    "icon-KingFisher",
                    function(iNatObsJSON) {
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
                    "Obtain 77+ daisy observations.",
                    77,
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
                    "Obtain 13+ observations of endangered species.",
                    13,
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
                    "Obtain 10+ observations of butterflies, while having an activity count of 1000+ on iNaturalist.",
                    10,
                    "icon-SocialButterfly",
                    function(iNatObsJSON) {
                        for (var t = 0; t < iNatObsJSON.taxon.ancestor_ids.length; t++) {
                            var taxonID = iNatObsJSON.taxon.ancestor_ids[t];
                            if ($.inArray(taxonID, [47224]) >= 0) {
                                if (socialCount >= 1000) {
                                    return 1;
                                }
                            }
                        }
                        return 0;
                    }
                ),

            new AchievementCardData(
                    "Many Swallows",
                    "Obtain 30+ observations of swallows.",
                    30,
                    "icon-GroupTherapy",
                    function(iNatObsJSON) {
                        for (var t = 0; t < iNatObsJSON.taxon.ancestor_ids.length; t++) {
                            var taxonID = iNatObsJSON.taxon.ancestor_ids[t];
                            if ($.inArray(taxonID, [11853]) >= 0) {
                                return 1;
                            }
                        }
                        return 0;
                    }
                ),

            new AchievementCardData(
                    "Name Giver",
                    "Make 200+ identifications.",
                    200,
                    "icon-NameGiver",
                    function(iNatObsJSON) {
// FIXME: This cuts off at the max of the number of observations, find a way to increase faster to get to the read value by the end
                        if (idCount-- > 0) {
                            return 1;
                        }
                        return 0;
                    }
                ),

            new AchievementCardData(
                    "Rat King",
                    "Obtain 15+ observations of rodents.",
                    15,
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
                    "Obtain 10+ observations of storks and cranes.",
                    10,
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
                    "Obtain 60+ observations of bugs.",
                    60,
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
                    "Obtain 99+ observations of species commonly thought to be bugs, but aren't. (Myriapods, Arachnids, Entognathans and Insects which are not true bugs.)",
                    99,
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
                    "Obtain 40+ observations of lichen and moss.",
                    40,
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
                    "Obtain 30+ observations of frogs/toads and mushrooms.",
                    30,
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
                    "Make observations of 30+ different orders of flowers.",
                    30,
                    "icon-FlowerChild",
                    function(iNatObsJSON) {
                        for (var t = 0; t < iNatObsJSON.taxon.ancestor_ids.length; t++) {
                            var taxonID = iNatObsJSON.taxon.ancestor_ids[t];
                            if (iNatObsJSON.taxon.rank_level <= 40 && $.inArray(taxonID, [47125]) >= 0) {
                                if (!flowerOrderCount.includes(iNatObsJSON.taxon.ancestor_ids[5])) {
                                    flowerOrderCount.push(iNatObsJSON.taxon.ancestor_ids[5]);
                                    return 1;
                                }
                            }
                        }
                        return 0;
                    }
                ),

            new AchievementCardData(
                    "Classy Observer",
                    "Make observations of 20+ different classes.",
                    20,
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
                    "Daily Life",
                    "On 24+ days make 24+ observations of 24+ different species.",
                    24,
                    "icon-DailyLife",
                    function(iNatObsJSON) {
                        var wasTriggered = false;
                        if (dailyLifeDate !== iNatObsJSON.observed_on_details.date) {
                            dailyLifeDate = iNatObsJSON.observed_on_details.date;
                            dailyObsCount = 0;
                            dailySpeciesCount = [];
                        }
                        if (dailyObsCountMax < ++dailyObsCount) {
                            dailyObsCountMax = dailyObsCount;
                            wasTriggered = true;
                        }
                        if (iNatObsJSON.taxon.rank_level <= 10) {
// FIXME: This is likely also counting subspecies, but the intent is only to count species...
                            if (!dailySpeciesCount.includes(iNatObsJSON.taxon.id)) {
                                dailySpeciesCount.push(iNatObsJSON.taxon.id);
                            }
                        }
                        if (dailySpeciesCountMax < dailySpeciesCount.length) {
                            dailySpeciesCountMax = dailySpeciesCount.length;
                            wasTriggered = true;
                        }
                        if (wasTriggered) {
                            if (dailyObsCountMax >= 24 && dailySpeciesCountMax >= 24
                                    && dailyLifeDatePrev !== dailyLifeDate) {
                                dailyLifeDatePrev = dailyLifeDate;
                                return 1;
                            }
                        }
                        return 0;
                    }
                ),

            new AchievementCardData(
                    "Always On",
                    "Make 48+ observations over a 4 day period.",
                    48,
                    "icon-AlwaysOn",
                    function(iNatObsJSON) {
                        var date1 = new Date(alwaysOnDate.substr(0, 4), 
                                             alwaysOnDate.substr(5, 2), 
                                             alwaysOnDate.substr(8, 2));
                        var date2 = new Date(iNatObsJSON.observed_on_details.date.substr(0, 4), 
                                             iNatObsJSON.observed_on_details.date.substr(5, 2), 
                                             iNatObsJSON.observed_on_details.date.substr(8, 2));
                        if (Math.round(Math.abs(date1.getTime() - date2.getTime()) / alwaysOnOneDay) > 4) {
                            alwaysOnCount = 0;
                        }
                        if (alwaysOnDate !== iNatObsJSON.observed_on_details.date) {
                            alwaysOnCount++;
                            alwaysOnDate = iNatObsJSON.observed_on_details.date;
                        }
                        if (alwaysOnCountMax < alwaysOnCount) {
                            alwaysOnCountMax = alwaysOnCount;
                            return 1;
                        }
                        return 0;
                    }
                )

        ];
    }
