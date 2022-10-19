import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

const GOAL = 42;
const TAXA = [20979, 47169];

// TODO: Add some condition to link the two groups better
export default new AchievementData(
    'ToadsAndToadstools',
    GOAL,
    () => TAXA,
    (iNatObsJSON: Observation) => {
        for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
            if (TAXA.includes(taxonID)) {
                return 1;
            }
        }
        return 0;
    }
)
