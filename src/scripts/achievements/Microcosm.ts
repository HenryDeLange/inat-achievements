import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";


export default new AchievementData(
    'Microcosm',
    12,
    (iNatObsJSON: Observation) => {
        for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
            if ([123880, 67333, 126917, 124337, 151817, 47686, 54960, 131236].includes(taxonID)) {
                return 1;
            }
        }
        return 0;
    }
);
