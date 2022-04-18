import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

export default new AchievementData(
    'CraneyStorker',
    24,
    (iNatObsJSON: Observation) => {
        for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
            if ([3726, 23].includes(taxonID)) {
                return 1;
            }
        }
        return 0;
    }
);
