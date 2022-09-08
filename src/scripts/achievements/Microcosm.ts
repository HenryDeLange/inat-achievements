import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

const GOAL = 12;
const TAXA = [123880, 67333, 126917, 124337, 151817, 47686, 54960, 131236];

export default new AchievementData(
    'Microcosm',
    GOAL,
    (iNatObsJSON: Observation) => {
        for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
            if (TAXA.includes(taxonID)) {
                return 1;
            }
        }
        return 0;
    }
);
