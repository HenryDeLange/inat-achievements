import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

const GOAL = 2000;

let idCount = 0;

export default new AchievementData(
    'NameGiver',
    GOAL,
    (iNatObsJSON: Observation) => {
        if (idCount === 0) {
            idCount = iNatObsJSON?.user?.identifications_count ?? 0;
            return idCount;
        }
        return 0;
    },
    () => {
        idCount = 0;
    }
);
