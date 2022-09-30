import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

const GOAL = 33;
const TAXA = 47178;

// TODO: Instead count all fish species observed during a set period? Or combine with the King-Fisher bird?
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
