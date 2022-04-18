import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

// TODO: Also need to have left 100+ comments (also indicate the user's current comment and activity count in the details section)
export default new AchievementData(
    'SocialButterfly',
    100,
    (iNatObsJSON: Observation) => {
        if (iNatObsJSON?.user?.activity_count ?? 0 >= 10000) {
            for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                if ([47224].includes(taxonID)) {
                    return 1;
                }
            }
        }
        return 0;
    }
);
