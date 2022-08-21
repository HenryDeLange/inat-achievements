import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";
import { SPECIES_RANK, SUB_SPECIES_RANK } from "./utils";

let species: number[] = [];

export default new AchievementData(
    'TentacleSuckers',
    8,
    (iNatObsJSON: Observation) => {
        if ((iNatObsJSON?.taxon?.rank_level ?? 999) === SPECIES_RANK) {
            for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                if ([47459, 47797, 48332].includes(taxonID)) {
                    if (!species.includes(taxonID)) {
                        species.push(taxonID);
                        return 1;
                    }
                }
            }
        }
        else if ((iNatObsJSON?.taxon?.rank_level ?? 999) === SUB_SPECIES_RANK) {
            for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                if ([47459, 47797, 48332].includes(taxonID)) {
                    const parentTaxonID = iNatObsJSON?.taxon?.parent_id ?? 0;
                    if (!species.includes(parentTaxonID)) {
                        species.push(parentTaxonID);
                        return 1;
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
