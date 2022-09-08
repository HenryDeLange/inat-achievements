import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

const GOAL = 25;
const TAXA = 43698;

export default new AchievementData(
    'RatKing',
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
