import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

const GOAL = 100;
const TAXA = 47224;

// TODO: Also need to have left 100+ comments (also indicate the user's current comment and activity count in the details section)
export default new AchievementData(
    'SocialButterfly',
    GOAL,
    (iNatObsJSON: Observation) => {
        if (iNatObsJSON?.user?.activity_count ?? 0 >= 10000) {
            for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                if (TAXA === taxonID) {
                    return 1;
                }
            }
        }
        return 0;
    }
);
