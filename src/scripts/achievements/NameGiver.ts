import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

let idCount = 0;

export default new AchievementData(
    'NameGiver',
    2000,
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
