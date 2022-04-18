import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

export default new AchievementData(
    'GroupTherapy',
    30,
    (iNatObsJSON: Observation) => {
        for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
            if ([6544, 11853, 559244, 5362, 5425, 5391, 5400].includes(taxonID)) {
                return 1;
            }
        }
        return 0;
    }
);
