import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

const GOAL = 50;

export default new AchievementData(
    'NotSeeingIsBelieving',
    GOAL,
    (iNatObsJSON: Observation) => {
        for (const annotation of iNatObsJSON.annotations ?? []) {
            if (annotation.controlled_attribute_id === 22 && annotation.controlled_value_id !== 24) {
                return 1;
            }
        }
        return 0;
    }
);
