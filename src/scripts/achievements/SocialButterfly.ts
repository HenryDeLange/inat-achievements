import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

const GOAL = 100;
const TAXA = 47224;

// TODO: Make sure this also counts comments inside identifications?
export default new AchievementData(
    'SocialButterfly',
    GOAL,
    (iNatObsJSON: Observation) => {
        if ((iNatObsJSON?.comments_count ?? 0) > 0) {
            for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                if (TAXA === taxonID) {
                    return 1;
                }
            }
        }
        return 0;
    }
);
