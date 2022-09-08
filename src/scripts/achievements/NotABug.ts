import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

const GOAL = 201;
const TAXA_INCLUDE = [144128, 47119, 47158, 243773];
const TAXA_EXCLUDE = 61267;

export default new AchievementData(
    'NotABug',
    GOAL,
    (iNatObsJSON: Observation) => {
        for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
            if (TAXA_INCLUDE.includes(taxonID) && TAXA_EXCLUDE !== taxonID) {
                return 1;
            }
        }
        return 0;
    }
);
