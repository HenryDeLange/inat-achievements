import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

const GOAL = 40;
const TAXA = [311249, 54743];

export default new AchievementData(
    'LichenMoss',
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
