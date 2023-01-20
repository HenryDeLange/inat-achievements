import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

const GOAL = 50;
const ANNOTATION_ATTRIBUTE = 22;
const ANNOTATION_VALUE = 24;

export default new AchievementData(
    'NotSeeingIsBelieving',
    GOAL,
    () => [],
    (iNatObsJSON: Observation) => {
        for (const annotation of iNatObsJSON.annotations ?? []) {
            if (annotation.controlled_attribute_id === ANNOTATION_ATTRIBUTE
                    && annotation.controlled_value_id !== ANNOTATION_VALUE) {
                return 1;
            }
        }
        return 0;
    }
);