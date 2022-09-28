import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";
import { ORDER_RANK } from "./utils";
import getTaxonRank from "./utils/TaxonCache";

const GOAL = 18;
const TAXA = 47125;

let flowerOrderCount: number[] = [];

// TODO: Add condition to have 'flowering' annotation
export default new AchievementData(
    'FlowerChild',
    GOAL,
    (iNatObsJSON: Observation) => {
        if ((iNatObsJSON?.taxon?.rank_level ?? 999) <= ORDER_RANK) {
            if (iNatObsJSON?.taxon?.ancestor_ids && iNatObsJSON.taxon.ancestor_ids.length > 3) {
                const relevantAncestors = iNatObsJSON.taxon.ancestor_ids.slice(3, Math.min(7, iNatObsJSON.taxon.ancestor_ids.length));
                for (let taxonID of relevantAncestors) {
                    if (TAXA === taxonID) {
                        const rank = getTaxonRank(taxonID);
                        if (rank) {
                            if (rank === ORDER_RANK) {
                                if (!flowerOrderCount.includes(taxonID)) {
                                    flowerOrderCount.push(taxonID);
                                    return 1;
                                }
                            }
                            if (rank <= ORDER_RANK)
                                break;
                        }
                        else {
                            console.log(`Taxon Rank not found for ${iNatObsJSON.id}`);
                        }
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
