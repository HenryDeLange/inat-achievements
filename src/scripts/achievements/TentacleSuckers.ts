import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";
import { SPECIES_RANK } from "./utils";

export default new AchievementData(
    'TentacleSuckers',
    8,
    (iNatObsJSON: Observation) => {
        if ((iNatObsJSON?.taxon?.rank_level ?? 999) <= SPECIES_RANK) {
            for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                if ([47459, 47797, 48332].includes(taxonID)) {
                    return 1;
                }
            }
        }
        return 0;
    }
);
