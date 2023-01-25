import { Observation } from "../../types/iNaturalistTypes";
import AchievementWrapper from "../AchievementWrapper";
import { SPECIES_RANK, SUB_SPECIES_RANK } from "./utils";

const GOAL = 5;
const TAXA = 481959;

let species: number[] = [];

export default new AchievementWrapper(
    'SuperStar',
    GOAL,
    () => [TAXA],
    (iNatObsJSON: Observation) => {
        if (iNatObsJSON?.taxon?.rank_level && iNatObsJSON.taxon.rank_level <= SPECIES_RANK) {
            const rank = iNatObsJSON.taxon.rank_level;
            if (iNatObsJSON?.taxon?.id && rank === SPECIES_RANK) {
                for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                    if (TAXA === taxonID) {
                        const id = iNatObsJSON.taxon.id;
                        if (!species.includes(id)) {
                            species.push(id);
                            return 1;
                        }
                    }
                }
            }
            else if (iNatObsJSON?.taxon?.parent_id
                    && (rank === SUB_SPECIES_RANK || rank < SPECIES_RANK)) { // Assume non-subspecies (variety, etc.) work the same as subspecies
                for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                    if (TAXA === taxonID) {
                        const parentTaxonID = iNatObsJSON.taxon.parent_id;
                        if (!species.includes(parentTaxonID)) {
                            species.push(parentTaxonID);
                            return 1;
                        }
                    }
                }
            }
        }
        return 0;
    },
    () => {
        species = [];
    }
);
