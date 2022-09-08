import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

const GOAL = 20;
const TAXA = 47178;

// TODO: Instead I want to count all fish species observed during a week period
export default new AchievementData(
    'KingFisher',
    GOAL,
    (iNatObsJSON: Observation) => {
        for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
            if (TAXA === taxonID) {
                return 1;
            }
        }
        return 0;
    }
);
