import { AchievementType } from "../types/AchievementsTypes";
import { Observation } from "../types/iNaturalistTypes";
import AchievementData from "./AchievementData";

// TODO: In the future add different levels for the goals (for example: "observer 5/15/40 frogs")

// FIXME: See if I can find a better way to do this that does not use so many global variables...

const SPECIES_RANK = 10;
const SUB_SPECIES_RANK = 5;
// const RANK_HYBRID = 'rank';

// The array of achievements
let lstAchievementCardWrappers: AchievementData[] = [];
// Global state variables
let allTimeSpeciesCount: number[] = [];
let dailyObsCount = 0;
let dailyObsCountMax = 0;
let dailySpeciesCountMax = 0;
let dailySpeciesCount: number[] = [];
let dailyLifeDate = new Date(Date.UTC(2018, 2, 1)).toISOString().split('T')[0];
let dailyLifeDatePrev: string | null = null;
let classCount: number[] = [];
let flowerOrderCount: number[] = [];
let alwaysOnOneDay = 24 * 60 * 60 * 1000;
let alwaysOnDate = new Date(Date.UTC(2018, 2, 1)).toISOString().split('T')[0];
let alwaysOnCount = 0;
let alwaysOnCountMax = 0;
let idCount = 0;
let mammalDig = 0;
let mammalSwim = 0;
let mammalFly = 0;

export function getAchievements(): AchievementData[] {
    return lstAchievementCardWrappers;
}

export function getAchievementsAsType(): AchievementType[] {
    const list = [];
    for (let achievementData of lstAchievementCardWrappers) {
        const temp = { ...achievementData, evalFunc: undefined };
        list.push(temp);
    }
    return list;
}

export function clearAchievements() {
    lstAchievementCardWrappers = [];
    clearGlobalState();
}

function clearGlobalState() {
    allTimeSpeciesCount = [];
    dailyObsCount = 0;
    dailyObsCountMax = 0;
    dailySpeciesCountMax = 0;
    dailySpeciesCount = [];
    dailyLifeDate = new Date(Date.UTC(2018, 2, 1)).toISOString().split('T')[0];
    dailyLifeDatePrev = null;
    classCount = [];
    flowerOrderCount = [];
    alwaysOnOneDay = 24 * 60 * 60 * 1000;
    alwaysOnDate = new Date(Date.UTC(2018, 2, 1)).toISOString().split('T')[0];
    alwaysOnCount = 0;
    alwaysOnCountMax = 0;
    idCount = 0;
    mammalDig = 0;
    mammalSwim = 0;
    mammalFly = 0;
}

export function initAchievements() {
    lstAchievementCardWrappers = [

        new AchievementData(
            "Life Lister",
            "Obtain 500+ observations with different species level (or lower) identifications.",
            "LifeLister",
            500,
            (iNatObsJSON: Observation) => {
                if (iNatObsJSON?.taxon?.rank_level === SPECIES_RANK) {
                    if (!allTimeSpeciesCount.includes(iNatObsJSON.taxon.id)) {
                        allTimeSpeciesCount.push(iNatObsJSON.taxon.id);
                        return 1;
                    }
                }
                else if (iNatObsJSON?.taxon?.rank_level === SUB_SPECIES_RANK) {
                    if (!allTimeSpeciesCount.includes(iNatObsJSON?.taxon?.parent_id ?? 0)) {
                        allTimeSpeciesCount.push(iNatObsJSON?.taxon?.parent_id ?? 0);
                        return 1;
                    }
                }
                else if (iNatObsJSON?.taxon?.rank_level! < SPECIES_RANK) {
                    // For these I'm not sure if Species is the parent, but I assume it is so
                    if (!allTimeSpeciesCount.includes(iNatObsJSON?.taxon?.parent_id ?? 0)) {
                        console.log('Adding parent_id', iNatObsJSON?.taxon?.parent_id ?? 0, 'for unknown rank', iNatObsJSON?.taxon?.rank_level)
                        allTimeSpeciesCount.push(iNatObsJSON?.taxon?.parent_id ?? 0);
                        return 1;
                    }
                }
                return 0;
            }
        ),

        new AchievementData(
            "Self Pollinator",
            "Add comments on 50+ of your own observations.",
            "SelfPollinator",
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
                        break;
                    }
                    // swimming
                    if ([152871, 46306, 526556].includes(taxonID)) {
                        mammalSwim++;
                        break;
                    }
                    // flying
                    if ([40268].includes(taxonID)) {
                        mammalFly++;
                        break;
                    }
                }
                return (mammalDig <= 3 ? mammalDig - oldMammalDig : 0)
                    + (mammalSwim <= 3 ? mammalSwim - oldMammalSwim : 0)
                    + (mammalFly <= 3 ? mammalFly - oldMammalFly : 0);
            }
        ),

        new AchievementData(
            "Night Owl",
            "Obtain 12+ Owl or Nightjar observations at night (after 6PM and before 6AM).",
            "NightOwl",
            12,
            (iNatObsJSON: Observation) => {
                for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                    if ([19350, 19664, 19376, 19351].includes(taxonID)
                        && (iNatObsJSON?.observed_on_details?.hour ?? 9) <= 6
                        && (iNatObsJSON?.observed_on_details?.hour ?? 0) >= 18) {
                        return 1;
                    }
                }
                return 0;
            }
        ),

        // TODO: Instead I want to count all fish species observed during a week period
        new AchievementData(
            "King Fisher",
            "Obtain 20+ Fish observations.",
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
            "Obtain 77+ Daisy observations.",
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
            "Obtain 13+ observations of threatened species.",
            "HeartOfTheMatter",
            13,
            (iNatObsJSON: Observation) => {
                if (iNatObsJSON?.taxon?.threatened === true) {
                    return 1;
                }
                return 0;
            }
        ),

        // TODO: Also need to have left 100+ comments (also indicate the user's current comment and activity count in the details section)
        new AchievementData(
            "Social Butterfly",
            "Have an activity count of 10000+ on iNaturalist and obtain 100+ observations of Lepidoptera (Butterflies and Moths).",
            "SocialButterfly",
            100,
            (iNatObsJSON: Observation) => {
                if (iNatObsJSON?.user?.activity_count ?? 0 >= 10000) {
                    for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                        if ([47224].includes(taxonID)) {
                            return 1;
                        }
                    }
                }
                return 0;
            }
        ),

        new AchievementData(
            "Air Lovers",
            "Obtain 33+ observations of Swifts, Swallows, Albatrosses or Vultures.",
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
            "Contribute 2000+ identifications on observations.",
            "NameGiver",
            2000,
            (iNatObsJSON: Observation) => {
                if (idCount === 0) {
                    idCount = iNatObsJSON?.user?.identifications_count ?? 0;
                    return idCount;
                }
                return 0;
            }
        ),

        new AchievementData(
            "Rat King",
            "Obtain 25+ observations of Rodents.",
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
            "Obtain 24+ observations of Cranes and Storks.",
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
            "Obtain 99+ observations of true Bugs.",
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
            "Obtain 201+ observations of species commonly thought to be \"bugs\", but aren't: Myriapods, Arachnids, Entognathans and Insects which are not true Bugs.",
            "NotABug",
            201,
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
            "Obtain 40+ observations of Lichens and Mosses.",
            "LichenMoss",
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

        // TODO: Add some condition to link the two groups better
        new AchievementData(
            "Toads and Toadstools",
            "Obtain 42+ observations of either Toads (and Frogs) or Mushrooms.",
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

        // TODO: Add condition to have "flowering" annotation
        new AchievementData(
            "Flower Child",
            "Make observations of 30+ different orders of Flowering Plants.",
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
            "Make observations in 16+ different taxonomic classes.",
            "WorldClass",
            16,
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
            "Make 400+ observations over a 5 day period.",
            "AlwaysOn",
            400,
            (iNatObsJSON: Observation) => {
                let obsDate = iNatObsJSON?.observed_on_details?.date ?? alwaysOnDate;
                var date1 = new Date(Number(alwaysOnDate.substring(0, 5)), Number(alwaysOnDate.substring(5, 8)), Number(alwaysOnDate.substring(8, 10)));
                var date2 = new Date(Number(obsDate.substring(0, 5)), Number(obsDate.substring(5, 8)), Number(obsDate.substring(8, 10)));
                if (Math.round(Math.abs(date1.getTime() - date2.getTime()) / alwaysOnOneDay) > 5) {
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
