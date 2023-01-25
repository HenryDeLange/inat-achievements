import { Observation } from "../../types/iNaturalistTypes";
import AchievementWrapper from "../AchievementWrapper";
import { SPECIES_RANK, SUB_SPECIES_RANK } from "./utils";

const GOAL = 24;

let dailySpeciesCount: number[] = [];
let dailyLifeDate: string | null = null;
let dailyLifeDatePrev: string | null = null;

export default new AchievementWrapper(
    'DailyLife',
    GOAL,
    () => [],
    (iNatObsJSON: Observation) => {
        const obsDate = iNatObsJSON?.observed_on_details?.date ?? dailyLifeDate;
        if (dailyLifeDate !== obsDate) {
            dailyLifeDate = obsDate;
            dailySpeciesCount = [];
        }
        let id = undefined;
        if (iNatObsJSON?.taxon?.rank_level === SPECIES_RANK) {
            id = iNatObsJSON.taxon.id ?? 0;
        }
        else if (iNatObsJSON?.taxon?.rank_level === SUB_SPECIES_RANK) {
            id = iNatObsJSON?.taxon?.parent_id ?? 0;
        }
        if (id) {
            if (!dailySpeciesCount.includes(id)) {
                dailySpeciesCount.push(id);
            }
            if (dailySpeciesCount.length >= GOAL && dailyLifeDatePrev !== dailyLifeDate) {
                dailyLifeDatePrev = dailyLifeDate;
                return 1;
            }
        }
        return 0;
    },
    () => {
        dailySpeciesCount = [];
        dailyLifeDate = null;
        dailyLifeDatePrev = null;
    }
);
