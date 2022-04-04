import { Observation } from "../types/iNaturalistTypes";
import AchievementCardData from "./AchievementCardData";

// The array of achievements
let lstAchievementCardWrappers: AchievementCardData[] = [];
    
// FIXME: See if I can find a better way to do this that does not use so many global variables...
let alltimeSpeciesCount: number[] = [];
let dailyObsCount = 0;
let dailyObsCountMax = 0;
let dailySpeciesCountMax = 0;
let dailySpeciesCount: number[] = [];
let dailyLifeDate = new Date(Date.UTC(2018, 2, 1)).toISOString().split('T')[0];
let dailyLifeDatePrev: string | null = null;
let classCount: number[] = [];
let flowerOrderCount: number[] = [];
let alwaysOnOneDay = 24*60*60*1000;
let alwaysOnDate = new Date(Date.UTC(2018, 2, 1)).toISOString().split('T')[0];
let alwaysOnCount = 0;
let alwaysOnCountMax = 0;
let idCount = 0;
let mammalDig = 0;
let mammalSwim = 0;
let mammalFly = 0;
    
function clearGlobalState() {
    alltimeSpeciesCount = [];
    dailyObsCount = 0;
    dailyObsCountMax = 0;
    dailySpeciesCountMax = 0;
    dailySpeciesCount = [];
    dailyLifeDate = new Date(Date.UTC(2018, 2, 1)).toISOString().split('T')[0];
    dailyLifeDatePrev = null;
    classCount = [];
    flowerOrderCount = [];
    alwaysOnOneDay = 24*60*60*1000;
    alwaysOnDate = new Date(Date.UTC(2018, 2, 1)).toISOString().split('T')[0];
    alwaysOnCount = 0;
    alwaysOnCountMax = 0;
    idCount = 0;
    mammalDig = 0;
    mammalSwim = 0;
    mammalFly = 0;
}

// TODO: In the future add different levels for the goals (for example: "observer 5/15/40 frogs")

// SETUP THE ACHIEVEMENTS
const SPECIES_RANK = 10;
const SUB_SPECIES_RANK = 5;
// const RANK_HYBRID = 'rank';

function setupAchievementsList() {
    lstAchievementCardWrappers = [

        new AchievementCardData(
            "Life Lister",
            "Observe 500+ different species.",
            500,
            "icon-LifeLister",
            (iNatObsJSON: Observation) => {
                if (iNatObsJSON?.taxon?.rank_level === SPECIES_RANK) {
                    if (!alltimeSpeciesCount.includes(iNatObsJSON.taxon.id)) {
                        alltimeSpeciesCount.push(iNatObsJSON.taxon.id);
                        return 1;
                    }
                }
                else if (iNatObsJSON?.taxon?.rank_level === SUB_SPECIES_RANK) {
                    if (!alltimeSpeciesCount.includes(iNatObsJSON?.taxon?.parent_id ?? 0)) {
                        alltimeSpeciesCount.push(iNatObsJSON?.taxon?.parent_id ?? 0);
                        return 1;
                    }
                }
                return 0;
            }
        ),

        new AchievementCardData(
            "Self Pollinator",
            "Add 50+ comments to your own observations.",
            50,
            "icon-SelfPolinator",
            (iNatObsJSON: Observation) => {
                for (let comment of iNatObsJSON?.comments ?? []) {
                    if (comment?.user?.id === iNatObsJSON?.user?.id) {
                        return 1;
                    }
                }
                return 0;
            }
        ),

        new AchievementCardData(
            "Mammal Tryhard",
            "Obtain 3+ observations of flying, swimming and digging mammals each.",
            9,
            "icon-TryMammals",
            (iNatObsJSON: Observation) => {
                const oldMammalDig = mammalDig;
                const oldMammalSwim = mammalSwim;
                const oldMammalFly = mammalFly;
                for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                    // digging
                    if ([42478, 43253, 46927, 71384].includes(taxonID)) {
                        mammalDig++;
                    }
                    // swimming
                    if ([152871, 46306].includes(taxonID)) {
                        mammalSwim++;
                    }
                    // flying
                    if ([40268].includes(taxonID)) {
                        mammalFly++;
                    }
                }
                return (mammalDig === 3 ? mammalDig - oldMammalDig : 0)
                    + (mammalSwim === 3 ? mammalSwim - oldMammalSwim : 0)
                    + (mammalFly === 3 ? mammalFly - oldMammalFly : 0);
            }
        ),

        new AchievementCardData(
            "Night Owl",
            "Obtain 12+ owl observations.",
            12,
            "icon-NightOwl",
            (iNatObsJSON: Observation) => {
                for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                    if ([19350].includes(taxonID)) {
                        return 1;
                    }
                }
                return 0;
            }
        ),

// TODO: Instead I want to count all fish species observed during a week period
        new AchievementCardData(
            "King Fisher",
            "Obtain 20+ fish observations.",
            20,
            "icon-KingFisher",
            (iNatObsJSON: Observation) => {
                for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                    if ([47178].includes(taxonID)) {
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
            (iNatObsJSON: Observation) => {
                for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                    if ([47604].includes(taxonID)) {
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
            (iNatObsJSON: Observation) => {
                if (iNatObsJSON?.taxon?.threatened === true) {
                    return 1;
                }
                return 0;
            }
        ),

// TODO: Also need to have left 100+ comments
        new AchievementCardData(
            "Social Butterfly",
            "Obtain 100+ observations of butterflies (and moths) and have an activity count of 10000+ on iNaturalist.",
            100,
            "icon-SocialButterfly",
            (iNatObsJSON: Observation) => {
                for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                    if ([47224].includes(taxonID)) {
                        if (iNatObsJSON?.user?.activity_count ?? 0 >= 10000) {
                            return 1;
                        }
                    }
                }
                return 0;
            }
        ),

        new AchievementCardData(
            "Air Lovers",
            "Obtain 33+ observations of swifts, swallows, albatrosses or vultures.",
            30,
            "icon-GroupTherapy",
            (iNatObsJSON: Observation) => {
                for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                    if ([6544, 11853, 559244, 5362, 5425, 5391, 5400].includes(taxonID)) {
                        return 1;
                    }
                }
                return 0;
            }
        ),

        new AchievementCardData(
            "Name Giver",
            "Make 2000+ identifications.",
            2000,
            "icon-NameGiver",
            (iNatObsJSON: Observation) => {
                if (idCount === 0) {
                    idCount = iNatObsJSON?.user?.identifications_count ?? 0;
                }
                return idCount;
            }
        ),

        new AchievementCardData(
            "Rat King",
            "Obtain 25+ observations of rodents.",
            25,
            "icon-RatKing",
            (iNatObsJSON: Observation) => {
                for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                    if ([43698].includes(taxonID)) {
                        return 1;
                    }
                }
                return 0;
            }
        ),

        new AchievementCardData(
            "Craney Storker",
            "Obtain 24+ observations of storks and cranes.",
            24,
            "icon-CraneyStorker",
            (iNatObsJSON: Observation) => {
                for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                    if ([3726, 23].includes(taxonID)) {
                        return 1;
                    }
                }
                return 0;
            }
        ),

        new AchievementCardData(
            "So Many Bugs",
            "Obtain 99+ observations of bugs.",
            99,
            "icon-TooManyBugs",
            (iNatObsJSON: Observation) => {
                for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                    if ([61267].includes(taxonID)) {
                        return 1;
                    }
                }
                return 0;
            }
        ),

        new AchievementCardData(
            "Not A Bug",
            "Obtain 101+ observations of species commonly thought to be bugs, but aren't. (Myriapods, Arachnids, Entognathans and Insects which are not true bugs.)",
            101,
            "icon-NotABug",
            (iNatObsJSON: Observation) => {
                for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                    if ([144128, 47119, 47158, 243773].includes(taxonID) && ![61267].includes(taxonID)) {
                        return 1;
                    }
                }
                return 0;
            }
        ),

        new AchievementCardData(
                "I Lichen Moss",
                "Obtain 40+ observations of lichens and mosses.",
                40,
                "icon-LickenMoss",
                (iNatObsJSON: Observation) => {
                    for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                        if ([311249, 54743].includes(taxonID)) {
                            return 1;
                        }
                    }
                    return 0;
                }
            ),

        new AchievementCardData(
            "Toads and Toadstools",
            "Obtain 42+ observations of frogs/toads and mushrooms.",
            42,
            "icon-ToadsAndToadstools",
            (iNatObsJSON: Observation) => {
                for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                    if ([20979, 47169].includes(taxonID) || [47169].includes(taxonID)) {
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
            (iNatObsJSON: Observation) => {
                for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                    if ((iNatObsJSON?.taxon?.rank_level ?? 100 <= 40) && [47125].includes(taxonID)) {
                        let orderID = iNatObsJSON?.taxon?.ancestor_ids?.[5] ?? -1;
                        if (!flowerOrderCount.includes(orderID)) {
                            flowerOrderCount.push(orderID);
                            return 1;
                        }
                    }
                }
                return 0;
            }
        ),

        new AchievementCardData(
            "Classy Observer",
            "Make observations in 20+ different classes.",
            20,
            "icon-WorldClass",
            (iNatObsJSON: Observation) => {
                let classID = iNatObsJSON?.taxon?.iconic_taxon_id ?? -1;
                if (!classCount.includes(classID)) {
                    classCount.push(classID);
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
            (iNatObsJSON: Observation) => {
                let wasTriggered = false;
                let obsDate = iNatObsJSON?.observed_on_details?.date ?? dailyLifeDate;
                if (dailyLifeDate !== obsDate) {
                    dailyLifeDate = obsDate;
                    dailyObsCount = 0;
                    dailySpeciesCount = [];
                }
                if (dailyObsCountMax < ++dailyObsCount) {
                    dailyObsCountMax = dailyObsCount;
                    wasTriggered = true;
                }
                if (iNatObsJSON?.taxon?.rank_level === SPECIES_RANK) {
                    if (!dailySpeciesCount.includes(iNatObsJSON.taxon.id)) {
                        dailySpeciesCount.push(iNatObsJSON.taxon.id);
                    }
                }
                else if (iNatObsJSON?.taxon?.rank_level === SUB_SPECIES_RANK) {
                    if (!dailySpeciesCount.includes(iNatObsJSON?.taxon?.parent_id ?? 0)) {
                        dailySpeciesCount.push(iNatObsJSON?.taxon?.parent_id ?? 0);
                    }
                }
                if (dailySpeciesCountMax < dailySpeciesCount.length) {
                    dailySpeciesCountMax = dailySpeciesCount.length;
                    wasTriggered = true;
                }
                if (wasTriggered) {
                    if (dailyObsCountMax >= 24 && dailySpeciesCountMax >= 24 && dailyLifeDatePrev !== dailyLifeDate) {
                        dailyLifeDatePrev = dailyLifeDate;
                        return 1;
                    }
                }
                return 0;
            }
        ),

        new AchievementCardData(
            "Always On",
            "Make 400+ observations over a 4 day period.",
            400,
            "icon-AlwaysOn",
            (iNatObsJSON: Observation) => {
                let obsDate = iNatObsJSON?.observed_on_details?.date ?? alwaysOnDate;
                var date1 = new Date(Number(alwaysOnDate.substring(0, 5)), Number(alwaysOnDate.substring(5, 8)), Number(alwaysOnDate.substring(8, 10)));
                var date2 = new Date(Number(obsDate.substring(0, 5)), Number(obsDate.substring(5, 8)), Number(obsDate.substring(8, 10)));
                if (Math.round(Math.abs(date1.getTime() - date2.getTime()) / alwaysOnOneDay) > 4) {
                    alwaysOnCount = 0;
                }
                if (alwaysOnDate !== obsDate) {
                    alwaysOnCount++;
                    alwaysOnDate = obsDate;
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
