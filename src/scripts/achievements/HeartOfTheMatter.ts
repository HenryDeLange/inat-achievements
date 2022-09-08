import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

const GOAL = 13;

export default new AchievementData(
    'HeartOfTheMatter',
    GOAL,
    (iNatObsJSON: Observation) => {
        if (iNatObsJSON?.taxon?.threatened === true) {
            return 1;
        }
        return 0;
    }
);
