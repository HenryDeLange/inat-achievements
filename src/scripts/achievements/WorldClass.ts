import { TaxonRankCacheType } from "../../types/AchievementsTypes";
import { Observation } from "../../types/iNaturalistTypes";
import AchievementWrapper from "../AchievementWrapper";
import { CLASS_RANK } from "./utils";

const GOAL = 21;

let classCount: number[] = [];

export default new AchievementWrapper(
    'WorldClass',
    GOAL,
    () => [],
    (iNatObsJSON: Observation, taxonRanks: TaxonRankCacheType[]) => {
        if ((iNatObsJSON?.taxon?.rank_level ?? 999) <= CLASS_RANK) {
            if (iNatObsJSON?.taxon?.ancestor_ids && iNatObsJSON.taxon.ancestor_ids.length > 2) {
                const relevantAncestors = iNatObsJSON.taxon.ancestor_ids.slice(2, Math.min(6, iNatObsJSON.taxon.ancestor_ids.length));
                for (let taxonID of relevantAncestors) {
                    const rank = taxonRanks.find((taxonRankCache) => taxonRankCache.taxonID === taxonID)?.rank;
                    if (rank) {
                        if (rank === CLASS_RANK) {
                            if (!classCount.includes(taxonID)) {
                                classCount.push(taxonID);
                                return 1;
                            }
                        }
                        if (rank <= CLASS_RANK)
                            break;
                    }
                    else {
                        console.log(`Taxon Rank not found for taxon ${taxonID} on observation ${iNatObsJSON.id}`);
                    }
                }
            }
        }
        return 0;
    },
    () => {
        classCount = [];
    }
);
