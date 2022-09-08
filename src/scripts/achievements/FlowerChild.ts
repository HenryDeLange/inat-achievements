import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

const GOAL = 30;
const TAXA = 47125;

let flowerOrderCount: number[] = [];

// TODO: Add condition to have 'flowering' annotation
export default new AchievementData(
    'FlowerChild',
    GOAL,
    (iNatObsJSON: Observation) => {
        for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
            if ((iNatObsJSON?.taxon?.rank_level ?? 100 <= 40) && TAXA === taxonID) {
                let orderID = iNatObsJSON?.taxon?.ancestor_ids?.[5] ?? -1;
                if (!flowerOrderCount.includes(orderID)) {
                    flowerOrderCount.push(orderID);
                    return 1;
                }
            }
        }
        return 0;
    },
    () => {
        flowerOrderCount = [];
    }
);
