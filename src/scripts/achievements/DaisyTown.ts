import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

const GOAL = 77;
const TAXA = 47604;

export default new AchievementData(
    'DaisyTown',
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
