import { Observation } from "../../types/iNaturalistTypes";
import AchievementWrapper from "../AchievementWrapper";

const GOAL = 13;

export default new AchievementWrapper(
    'HeartOfTheMatter',
    GOAL,
    () => [],
    (iNatObsJSON: Observation) => {
        if (iNatObsJSON?.taxon?.threatened === true) {
            return 1;
        }
        return 0;
    }
);
