import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

const GOAL = 50;

export default new AchievementData(
    'SelfPollinator',
    GOAL,
    () => [],
    (iNatObsJSON: Observation) => {
        if (iNatObsJSON?.comments && iNatObsJSON?.user?.id) {
            for (let comment of iNatObsJSON?.comments ?? []) {
                if (comment?.user?.id && comment.user.id === iNatObsJSON.user.id) {
                    return 1;
                }
            }
        }
        return 0;
    }
);
