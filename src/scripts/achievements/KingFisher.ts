import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

// TODO: Instead I want to count all fish species observed during a week period
export default new AchievementData(
    'KingFisher',
    20,
    (iNatObsJSON: Observation) => {
        for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
            if ([47178].includes(taxonID)) {
                return 1;
            }
        }
        return 0;
    }
);
