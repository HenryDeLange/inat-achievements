import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";
import { SPECIES_RANK, SUB_SPECIES_RANK } from "./utils";

let allTimeSpeciesCount: number[] = [];

export default new AchievementData(
    'LifeLister',
    365,
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
                // console.log('Adding parent_id', iNatObsJSON?.taxon?.parent_id ?? 0, 'for unknown rank', iNatObsJSON?.taxon?.rank_level)
                allTimeSpeciesCount.push(iNatObsJSON?.taxon?.parent_id ?? 0);
                return 1;
            }
        }
        return 0;
    },
    () => {
        allTimeSpeciesCount = [];
    }
);
