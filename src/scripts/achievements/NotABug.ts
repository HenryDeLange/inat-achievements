import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

export default new AchievementData(
    'NotABug',
    201,
    (iNatObsJSON: Observation) => {
        for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
            if ([144128, 47119, 47158, 243773].includes(taxonID) && ![61267].includes(taxonID)) {
                return 1;
            }
        }
        return 0;
    }
);
