import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

const GOAL = 99;
const TAXA = 61267;

export default new AchievementData(
    'TooManyBugs',
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
