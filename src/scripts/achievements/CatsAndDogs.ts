import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

const GOAL = 9;
const TAXA_FELINE = 41944;
const TAXA_CANINE = 42043;

let catDays: string[] = [];
let dogDays: string[] = [];

export default new AchievementData(
    'CatsAndDogs',
    GOAL,
    () => [TAXA_FELINE, TAXA_CANINE],
    (iNatObsJSON: Observation) => {
        if (iNatObsJSON.observed_on_details?.date) {
            for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                if (TAXA_FELINE === taxonID) {
                    const date = getDate(iNatObsJSON);
                    if (!catDays.includes(date)) {
                        catDays.push(date);
                        if (dogDays.includes(date)) {
                            return 1;
                        }
                    }
                }
                else if (TAXA_CANINE === taxonID) {
                    const date = getDate(iNatObsJSON);
                    if (!dogDays.includes(date)) {
                        dogDays.push(date);
                        if (catDays.includes(date)) {
                            return 1;
                        }
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

