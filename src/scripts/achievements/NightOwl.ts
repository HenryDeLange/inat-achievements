import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

const GOAL = 12;
const TAXA = [19350, 19664, 19376, 19351];

export default new AchievementData(
    'NightOwl',
    GOAL,
    (iNatObsJSON: Observation) => {
        for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
            if (TAXA.includes(taxonID)
                    && (iNatObsJSON?.observed_on_details?.hour ?? 9) <= 6
                    && (iNatObsJSON?.observed_on_details?.hour ?? 0) >= 18) {
                return 1;
            }
        }
        return 0;
    }
);
