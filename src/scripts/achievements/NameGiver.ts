/* eslint-disable import/no-anonymous-default-export */
import { Observation } from "../../types/iNaturalistTypes";
import AchievementWrapper from "../AchievementWrapper";

const GOAL = 2000;

let idCount = 0;

export default new AchievementWrapper(
    'NameGiver',
    GOAL,
    () => [],
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
