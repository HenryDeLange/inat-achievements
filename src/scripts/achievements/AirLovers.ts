import { Observation } from "../../types/iNaturalistTypes";
import AchievementWrapper from "../AchievementWrapper";

const GOAL = 30;
const TAXA = [6544, 11853, 559244, 5362, 5425, 5391, 5400];

export default new AchievementWrapper(
    'AirLovers',
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
);
