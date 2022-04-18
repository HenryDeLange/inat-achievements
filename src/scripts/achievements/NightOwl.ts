import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

export default new AchievementData(
    'NightOwl',
    12,
    (iNatObsJSON: Observation) => {
        for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
            if ([19350, 19664, 19376, 19351].includes(taxonID)
                && (iNatObsJSON?.observed_on_details?.hour ?? 9) <= 6
                && (iNatObsJSON?.observed_on_details?.hour ?? 0) >= 18) {
                return 1;
            }
        }
        return 0;
    }
);
