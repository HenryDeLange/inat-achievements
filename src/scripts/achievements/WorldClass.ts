import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";
import { CLASS_RANK } from "./utils";
import { getTaxonRank } from "./utils/TaxonCache";

const GOAL = 16;

let classCount: number[] = [];

export default new AchievementData(
    'WorldClass',
    GOAL,
    (iNatObsJSON: Observation) => {
        if ((iNatObsJSON?.taxon?.rank_level ?? 999) <= CLASS_RANK) {
            if (iNatObsJSON?.taxon?.ancestor_ids && iNatObsJSON.taxon.ancestor_ids.length > 2) {
                const relevantAncestors = iNatObsJSON.taxon.ancestor_ids.slice(2, Math.min(6, iNatObsJSON.taxon.ancestor_ids.length));
                for (let taxonID of relevantAncestors) {
                    const rank = getTaxonRank(taxonID);
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
                        console.log(`Taxon Rank not found for ${iNatObsJSON.id}`);
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
