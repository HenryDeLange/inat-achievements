import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";


export default new AchievementData(
    'TentacleSuckers',
    0,
    (iNatObsJSON: Observation) => {
        
        return -1;
    }
);
