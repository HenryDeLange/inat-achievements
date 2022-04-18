import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

// TODO: Add some condition to link the two groups better
export default new AchievementData(
    'ToadsAndToadstools',
    42,
    (iNatObsJSON: Observation) => {
        for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
            if ([20979, 47169].includes(taxonID) || [47169].includes(taxonID)) {
                return 1;
            }
        }
        return 0;
    }
)
