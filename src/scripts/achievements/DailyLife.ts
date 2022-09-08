import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";
import { SPECIES_RANK, SUB_SPECIES_RANK } from "./utils";

const GOAL = 24;

let dailyObsCount = 0;
let dailyObsCountMax = 0;
let dailySpeciesCountMax = 0;
let dailySpeciesCount: number[] = [];
let dailyLifeDate = new Date(Date.UTC(1980, 1, 1)).toISOString().split('T')[0];
let dailyLifeDatePrev: string | null = null;

export default new AchievementData(
    'DailyLife',
    GOAL,
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
            if (dailyObsCountMax >= GOAL && dailySpeciesCountMax >= GOAL && dailyLifeDatePrev !== dailyLifeDate) {
                dailyLifeDatePrev = dailyLifeDate;
                return 1;
            }
        }
        return 0;
    },
    () => {
        dailyObsCount = 0;
        dailyObsCountMax = 0;
        dailySpeciesCountMax = 0;
        dailySpeciesCount = [];
        dailyLifeDate = new Date(Date.UTC(1980, 1, 1)).toISOString().split('T')[0];
        dailyLifeDatePrev = null;
    }
);
