/* eslint-disable import/no-anonymous-default-export */
import { Observation } from "../../types/iNaturalistTypes";
import AchievementWrapper from "../AchievementWrapper";
import { SPECIES_RANK, SUB_SPECIES_RANK } from "./utils";

const GOAL = 8;
const TAXA = [47459, 47797, 48332];

let species: number[] = [];

export default new AchievementWrapper(
    'TentacleSuckers',
    GOAL,
    () => TAXA,
    (iNatObsJSON: Observation) => {
        if (iNatObsJSON?.taxon?.rank_level) {
            if (iNatObsJSON.taxon.rank_level <= SPECIES_RANK) {
                for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                    if (TAXA.includes(taxonID)) {
                        let speciesID;
                        if (iNatObsJSON?.taxon?.id && iNatObsJSON.taxon.rank_level === SPECIES_RANK) {
                            speciesID = iNatObsJSON.taxon.id;
                        }
                        else if (iNatObsJSON?.taxon?.parent_id 
                                && (iNatObsJSON.taxon.rank_level === SUB_SPECIES_RANK
                                    || iNatObsJSON.taxon.rank_level < SPECIES_RANK)) {
                            speciesID = iNatObsJSON.taxon.parent_id;
                        }
                        if (speciesID && !species.includes(speciesID)) {
                            species.push(speciesID);
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
