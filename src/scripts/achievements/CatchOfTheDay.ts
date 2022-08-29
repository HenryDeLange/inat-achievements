import { addDays, formatISO9075, parseISO } from "date-fns";
import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

const GOAL = 5;
const TAXA = [47178, 85497, 47273];


let maximum = 0;
let fishDays: string[] = [];

export default new AchievementData(
    'CatchOfTheDay',
    GOAL,
    (iNatObsJSON: Observation) => {
        if (iNatObsJSON?.observed_on_details?.date) {
            for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                if (TAXA.includes(taxonID)) {
                    let obsDate = iNatObsJSON.observed_on_details.date;
                    if (!fishDays.includes(obsDate)) {
                        fishDays.push(obsDate);
                        if (fishDays.length === 1) {
                            maximum = 1;
                            return 1;
                        }
                        else {
                            const date = parseISO(obsDate);
                            let countConsecutiveDays = 0;
                            for (let i = 1; i <= GOAL; i++) {
                                if (fishDays.includes(formatISO9075(addDays(date, i), { representation: 'date' })))
                                    countConsecutiveDays++;
                            }
                            if (countConsecutiveDays > maximum) {
                                maximum = countConsecutiveDays;
                                return 1;
                            }
                        }
                    }
                }
            }
        }
        return 0;
    },
    () => {
        maximum = 0;
        fishDays = [];
    }
);
