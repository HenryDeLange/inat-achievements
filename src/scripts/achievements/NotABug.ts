import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

const GOAL = 201;
const TAXA_INCLUDE = [47158, 144128, 47119, 243773];
const TAXA_EXCLUDE = 61267;

export default new AchievementData(
    'NotABug',
    GOAL,
    () => [...TAXA_INCLUDE, TAXA_EXCLUDE],
    (iNatObsJSON: Observation) => {
        let include = false;
        let exclude = false;
        for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
            if (TAXA_INCLUDE.includes(taxonID))
                include = true;
            if (TAXA_EXCLUDE === taxonID)
                exclude = true;
        }
        if (include && !exclude) {
            return 1;
        }
        return 0;
    }
);
