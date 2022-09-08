import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";
import { SPECIES_RANK, SUB_SPECIES_RANK } from "./utils";

const GOAL = 5;
const TAXA = 481959;

let species: number[] = [];
let faves = 0;

export default new AchievementData(
    'SuperStar',
    GOAL,
    (iNatObsJSON: Observation) => {
        const prevMin = Math.min(species.length, faves);
        // Faves
        if (iNatObsJSON.faves && iNatObsJSON.faves.length > 0) {
            for (let fave of iNatObsJSON.faves) {
                if (fave.user?.id !== iNatObsJSON.user?.id) { // Don't count own faves
                    faves++;
                }
            }
        }
        // Taxon
        if ((iNatObsJSON?.taxon?.rank_level ?? 999) === SPECIES_RANK) {
            for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                if (TAXA === taxonID) {
                    if (!species.includes(taxonID)) {
                        species.push(taxonID);
                    }
                }
            }
        }
        else if ((iNatObsJSON?.taxon?.rank_level ?? 999) === SUB_SPECIES_RANK) {
            for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                if (TAXA === taxonID) {
                    const parentTaxonID = iNatObsJSON?.taxon?.parent_id ?? 0;
                    if (!species.includes(parentTaxonID)) {
                        species.push(parentTaxonID);
                    }
                }
            }
        }
        // Check
        if (Math.min(species.length, faves) > prevMin) {
            return 1;
        }
        return 0;
    },
    () => {
        species = [];
        faves = 0;
    }
);
