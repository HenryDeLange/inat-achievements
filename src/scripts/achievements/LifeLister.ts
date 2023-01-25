import { Observation } from "../../types/iNaturalistTypes";
import AchievementWrapper from "../AchievementWrapper";
import { SPECIES_RANK, SUB_SPECIES_RANK } from "./utils";

const GOAL = 365;

let allTimeSpeciesCount: number[] = [];
let currentYear = 0;
let maxCount = 0;

export default new AchievementWrapper(
    'LifeLister',
    GOAL,
    () => [],
    (iNatObsJSON: Observation) => {
        if (iNatObsJSON.observed_on_details?.year
                && ((iNatObsJSON.taxon?.id && iNatObsJSON?.taxon?.rank_level === SPECIES_RANK)
                    || (iNatObsJSON.taxon?.parent_id && iNatObsJSON?.taxon?.rank_level === SUB_SPECIES_RANK))) {
            if (currentYear !== iNatObsJSON.observed_on_details?.year) {
                allTimeSpeciesCount = [];
                currentYear = iNatObsJSON.observed_on_details?.year;
            }
            if (iNatObsJSON.taxon?.id && iNatObsJSON?.taxon?.rank_level === SPECIES_RANK) {
                const id = iNatObsJSON.taxon.id;
                if (!allTimeSpeciesCount.includes(id)) {
                    allTimeSpeciesCount.push(id);
                }
            }
            else if (iNatObsJSON?.taxon?.parent_id) {
                const id = iNatObsJSON?.taxon?.parent_id;
                if (iNatObsJSON?.taxon?.rank_level === SUB_SPECIES_RANK && !allTimeSpeciesCount.includes(id)) {
                    allTimeSpeciesCount.push(id);
                }
                // For these I'm not sure if Species is the parent, but I assume it is so
                else if (iNatObsJSON?.taxon?.rank_level! < SPECIES_RANK && !allTimeSpeciesCount.includes(id)) {
                    // console.log('Adding parent_id', id, 'for unknown rank', iNatObsJSON?.taxon?.rank_level)
                    allTimeSpeciesCount.push(id);
                }
            }
            if (maxCount < allTimeSpeciesCount.length) {
                maxCount = allTimeSpeciesCount.length;
                return 1;
            }
        }
        return 0;
    },
    () => {
        allTimeSpeciesCount = [];
        currentYear = 0;
        maxCount = 0;
    }
);
