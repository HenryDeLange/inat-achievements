import { addDays, formatISO9075 } from "date-fns";
import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

const GOAL = 24
const TAXA = [47398, 39532, 47114, 61415];
const WEEK = 7;

let obsPerDay = new Map<string, number>();
let maxCount = 0;

export default new AchievementData(
    'HomelyHermit',
    GOAL,
    () => TAXA,
    (iNatObsJSON: Observation) => {
        for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
            if (TAXA.includes(taxonID)) {
                if (iNatObsJSON?.observed_on_details?.date) {
                    const obsDate = iNatObsJSON.observed_on_details.date;
                    const date = new Date(obsDate);
                    const obsCount = (obsPerDay.get(obsDate) ?? 0) + 1;
                    obsPerDay.set(obsDate, obsCount);
                    let currentMaxCount = obsCount;
                    for (let i = 1; i <= WEEK - 1; i++) {
                        const prevDayObsCount = obsPerDay.get(formatISO9075(addDays(date, i), { representation: 'date' }));
                        if (prevDayObsCount) {
                            currentMaxCount += prevDayObsCount;
                        }
                    }
                    if (currentMaxCount > maxCount) {
                        maxCount = currentMaxCount;
                        return 1;
                    }
                }
            }
        }
        return 0;
    },
    () => {
        obsPerDay.clear();
        maxCount = 0;
    }
);
