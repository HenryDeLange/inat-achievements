import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

export default new AchievementData(
    'HeartOfTheMatter',
    13,
    (iNatObsJSON: Observation) => {
        if (iNatObsJSON?.taxon?.threatened === true) {
            return 1;
        }
        return 0;
    }
);
