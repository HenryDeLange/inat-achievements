import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

const GOAL = 50;

export default new AchievementData(
    'SelfPollinator',
    GOAL,
    (iNatObsJSON: Observation) => {
        for (let comment of iNatObsJSON?.comments ?? []) {
            if (comment?.user?.id === iNatObsJSON?.user?.id) {
                return 1;
            }
        }
        return 0;
    }
);
