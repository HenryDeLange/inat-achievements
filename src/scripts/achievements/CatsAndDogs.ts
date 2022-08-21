import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

let catDays: string[] = [];
let dogDays: string[] = [];

export default new AchievementData(
    'CatsAndDogs',
    9,
    (iNatObsJSON: Observation) => {
        for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
            if ([41944].includes(taxonID)) { // Feline
                const date = getDate(iNatObsJSON);
                if (!catDays.includes(date)) {
                    catDays.push(date);
                    if (dogDays.includes(date)) {
                        return 1;
                    }
                }
            }
            else if ([42043].includes(taxonID)) { // Canine
                const date = getDate(iNatObsJSON);
                if (!dogDays.includes(date)) {
                    dogDays.push(date);
                    if (catDays.includes(date)) {
                        return 1;
                    }
                }
            }
        }
        return 0;
    },
    () => {
        catDays = [];
        dogDays = [];
    }
);

function getDate(iNatObsJSON: Observation): string {
    return iNatObsJSON.observed_on_details?.date ? iNatObsJSON.observed_on_details?.date : 'unknown';
}

