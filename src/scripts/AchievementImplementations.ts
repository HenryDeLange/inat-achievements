import { Observation } from "../types/iNaturalistTypes";
import AchievementData from "./AchievementData";

// The array of achievements
let lstAchievementCardWrappers: AchievementData[] = [];
    
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

        new AchievementData(
            "Life Lister",
            "Observe 500+ different species.",
            "LifeLister",
            500,
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

        new AchievementData(
            "Self Pollinator",
            "Add 50+ comments to your own observations.",
            "SelfPolinator",
            50,
            (iNatObsJSON: Observation) => {
                for (let comment of iNatObsJSON?.comments ?? []) {
                    if (comment?.user?.id === iNatObsJSON?.user?.id) {
                        return 1;
                    }
                }
                return 0;
            }
        ),

        new AchievementData(
            "Mammal Tryhard",
            "Obtain 3+ observations of flying, swimming and digging mammals each.",
            "TryMammals",
            9,
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

        new AchievementData(
            "Night Owl",
            "Obtain 12+ owl observations.",
            "NightOwl",
            12,
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
        new AchievementData(
            "King Fisher",
            "Obtain 20+ fish observations.",
            "KingFisher",
            20,
            (iNatObsJSON: Observation) => {
                for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                    if ([47178].includes(taxonID)) {
                        return 1;
                    }
                }
                return 0;
            }
        ),

        new AchievementData(
            "Daisy Town",
            "Obtain 77+ daisy observations.",
            "DaisyTown",
            77,
            (iNatObsJSON: Observation) => {
                for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                    if ([47604].includes(taxonID)) {
                        return 1;
                    }
                }
                return 0;
            }
        ),

        new AchievementData(
            "Heart Of The Matter",
            "Obtain 13+ observations of endangered species.",
            "HeartOfTheMatter",
            13,
            (iNatObsJSON: Observation) => {
                if (iNatObsJSON?.taxon?.threatened === true) {
                    return 1;
                }
                return 0;
            }
        ),

// TODO: Also need to have left 100+ comments
        new AchievementData(
            "Social Butterfly",
            "Obtain 100+ observations of butterflies (and moths) and have an activity count of 10000+ on iNaturalist.",
            "SocialButterfly",
            100,
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

        new AchievementData(
            "Air Lovers",
            "Obtain 33+ observations of swifts, swallows, albatrosses or vultures.",
            "GroupTherapy",
            30,
            (iNatObsJSON: Observation) => {
                for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                    if ([6544, 11853, 559244, 5362, 5425, 5391, 5400].includes(taxonID)) {
                        return 1;
                    }
                }
                return 0;
            }
        ),

        new AchievementData(
            "Name Giver",
            "Make 2000+ identifications.",
            "NameGiver",
            2000,
            (iNatObsJSON: Observation) => {
                if (idCount === 0) {
                    idCount = iNatObsJSON?.user?.identifications_count ?? 0;
                }
                return idCount;
            }
        ),

        new AchievementData(
            "Rat King",
            "Obtain 25+ observations of rodents.",
            "RatKing",
            25,
            (iNatObsJSON: Observation) => {
                for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                    if ([43698].includes(taxonID)) {
                        return 1;
                    }
                }
                return 0;
            }
        ),

        new AchievementData(
            "Craney Storker",
            "Obtain 24+ observations of storks and cranes.",
            "CraneyStorker",
            24,
            (iNatObsJSON: Observation) => {
                for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                    if ([3726, 23].includes(taxonID)) {
                        return 1;
                    }
                }
                return 0;
            }
        ),

        new AchievementData(
            "So Many Bugs",
            "Obtain 99+ observations of bugs.",
            "TooManyBugs",
            99,
            (iNatObsJSON: Observation) => {
                for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                    if ([61267].includes(taxonID)) {
                        return 1;
                    }
                }
                return 0;
            }
        ),

        new AchievementData(
            "Not A Bug",
            "Obtain 101+ observations of species commonly thought to be bugs, but aren't. (Myriapods, Arachnids, Entognathans and Insects which are not true bugs.)",
            "NotABug",
            101,
            (iNatObsJSON: Observation) => {
                for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                    if ([144128, 47119, 47158, 243773].includes(taxonID) && ![61267].includes(taxonID)) {
                        return 1;
                    }
                }
                return 0;
            }
        ),

        new AchievementData(
                "I Lichen Moss",
                "Obtain 40+ observations of lichens and mosses.",
                "LickenMoss",
                40,
                (iNatObsJSON: Observation) => {
                    for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                        if ([311249, 54743].includes(taxonID)) {
                            return 1;
                        }
                    }
                    return 0;
                }
            ),

        new AchievementData(
            "Toads and Toadstools",
            "Obtain 42+ observations of frogs/toads and mushrooms.",
            "ToadsAndToadstools",
            42,
            (iNatObsJSON: Observation) => {
                for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                    if ([20979, 47169].includes(taxonID) || [47169].includes(taxonID)) {
                        return 1;
                    }
                }
                return 0;
            }
        ),

        new AchievementData(
            "Flower Child",
            "Make observations of 30+ different orders of flowers.",
            "FlowerChild",
            30,
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

        new AchievementData(
            "Classy Observer",
            "Make observations in 20+ different classes.",
            "WorldClass",
            20,
            (iNatObsJSON: Observation) => {
                let classID = iNatObsJSON?.taxon?.iconic_taxon_id ?? -1;
                if (!classCount.includes(classID)) {
                    classCount.push(classID);
                    return 1;
                }
                return 0;
            }
        ),

        new AchievementData(
            "Daily Life",
            "On 24+ days make 24+ observations of 24+ different species.",
            "DailyLife",
            24,
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

        new AchievementData(
            "Always On",
            "Make 400+ observations over a 4 day period.",
            "AlwaysOn",
            400,
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
