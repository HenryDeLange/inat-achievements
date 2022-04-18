import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

export default new AchievementData(
    'LichenMoss',
    40,
    (iNatObsJSON: Observation) => {
        for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
            if ([311249, 54743].includes(taxonID)) {
                return 1;
            }
        }
        return 0;
    }
);
