import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";
import { MILLISECONDS_PER_DAY, SPECIES_RANK, SUB_SPECIES_RANK } from "./utils";

let maxSpecies = 0;
let species: number[] = [];
let startDate = new Date(Date.UTC(1980, 1, 1)).toISOString().split('T')[0];

export default new AchievementData(
    'CatchOfTheDay',
    7,
    (iNatObsJSON: Observation) => {
        // for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
        //     if ([47178, 85497, 47273].includes(taxonID)) {
        //         let obsDate = iNatObsJSON?.observed_on_details?.date ?? startDate;
        //         var date1 = new Date(Number(startDate.substring(0, 5)), Number(startDate.substring(5, 8)), Number(startDate.substring(8, 10)));
        //         var date2 = new Date(Number(obsDate.substring(0, 5)), Number(obsDate.substring(5, 8)), Number(obsDate.substring(8, 10)));
        //         if (Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / MILLISECONDS_PER_DAY) > 7) {
        //             species = [];
        //             startDate = obsDate;
        //         }
        //         let wasTriggered = false;
        //         if (iNatObsJSON?.taxon?.rank_level === SPECIES_RANK) {
        //             if (!species.includes(iNatObsJSON.taxon.id)) {
        //                 species.push(iNatObsJSON.taxon.id);
        //                 wasTriggered = true;
        //             }
        //         }
        //         else if (iNatObsJSON?.taxon?.rank_level === SUB_SPECIES_RANK) {
        //             if (!species.includes(iNatObsJSON?.taxon?.parent_id ?? 0)) {
        //                 species.push(iNatObsJSON?.taxon?.parent_id ?? 0);
        //                 wasTriggered = true;
        //             }
        //         }
        //         if (wasTriggered && species.length > maxSpecies) {
        //             maxSpecies = species.length;
        //             return 1;
        //         }
        //     }
        // }
        // return 0;
        return -1;
    },
    () => {
        maxSpecies = 0;
        species = [];
        startDate = new Date(Date.UTC(1980, 1, 1)).toISOString().split('T')[0];
    }
);
