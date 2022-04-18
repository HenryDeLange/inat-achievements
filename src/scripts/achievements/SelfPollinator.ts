import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

export default new AchievementData(
    'SelfPollinator',
    50,
    (iNatObsJSON: Observation) => {
        for (let comment of iNatObsJSON?.comments ?? []) {
            if (comment?.user?.id === iNatObsJSON?.user?.id) {
                return 1;
            }
        }
        return 0;
    }
);
