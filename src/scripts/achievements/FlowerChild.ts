import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";
import { ORDER_RANK } from "./utils";

const GOAL = 18;
const TAXA = 47125;
const ORDER_INDEX = 5;

let flowerOrderCount: number[] = [];

// TODO: Add condition to have 'flowering' annotation
export default new AchievementData(
    'FlowerChild',
    GOAL,
    (iNatObsJSON: Observation) => {
        if ((iNatObsJSON?.taxon?.rank_level ?? 999) <= ORDER_RANK) {
            for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                if (TAXA === taxonID) {
                    const orderID = (iNatObsJSON?.taxon?.ancestor_ids?.[ORDER_INDEX] ?? -1); // Is it OK to assume the index will always be 5?
                    if (!flowerOrderCount.includes(orderID)) {
                        flowerOrderCount.push(orderID);
                        return 1;
                    }
                }
            }
        }
        return 0;
    },
    () => {
        flowerOrderCount = [];
    }
);
