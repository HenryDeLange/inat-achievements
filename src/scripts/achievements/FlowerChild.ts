import { TaxonRankCacheType } from "../../types/AchievementsTypes";
import { Observation } from "../../types/iNaturalistTypes";
import AchievementWrapper from "../AchievementWrapper";
import { ORDER_RANK } from "./utils";

const GOAL = 25;
export const FLOWER_CHILD_TAXA = 47125;

let flowerOrderCount: number[] = [];

// TODO: Add condition to have 'flowering' annotation
export default new AchievementWrapper(
    'FlowerChild',
    GOAL,
    () => [FLOWER_CHILD_TAXA],
    (iNatObsJSON: Observation, taxonRanks: TaxonRankCacheType[]) => {
        if ((iNatObsJSON?.taxon?.rank_level ?? 999) <= ORDER_RANK) {
            if (iNatObsJSON?.taxon?.ancestor_ids && iNatObsJSON.taxon.ancestor_ids.length > 3) {
                let found = false;
                for (let taxonID of iNatObsJSON.taxon.ancestor_ids) {
                    if (taxonID === FLOWER_CHILD_TAXA) {
                        found = true;
                        break;
                    }
                }
                if (found) {
                    const relevantAncestors = iNatObsJSON.taxon.ancestor_ids.slice(3, Math.min(7, iNatObsJSON.taxon.ancestor_ids.length));
                    for (let taxonID of relevantAncestors) {
                        const rank = taxonRanks.find((taxonRankCache) => taxonRankCache.taxonID === taxonID)?.rank;
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
                            console.log(`Taxon Rank not found for taxon ${taxonID} on observation ${iNatObsJSON.id}`);
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
