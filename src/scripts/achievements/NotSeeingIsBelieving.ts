import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";


export default new AchievementData(
    'NotSeeingIsBelieving',
    0,
    (iNatObsJSON: Observation) => {
        
        return -1;
    }
);
