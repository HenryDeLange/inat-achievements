/* eslint-disable import/no-anonymous-default-export */
import { Observation } from "../../types/iNaturalistTypes";
import AchievementWrapper from "../AchievementWrapper";

const GOAL = 31;
const TAXA = [118903, 47336, 538904];

let monthID = '-1|-1';
let monthCount = 0;
let maxMonthCount = 0;

export default new AchievementWrapper(
    'EmployeeOfTheMonth',
    GOAL,
    () => TAXA,
    (iNatObsJSON: Observation) => {
        const obsMonthID = `${iNatObsJSON.observed_on_details?.year ?? -1}|${iNatObsJSON.observed_on_details?.month ?? -1}`;
        if (monthID !== obsMonthID) {
            monthID = obsMonthID;
            monthCount = 0;
        }
        for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
            if (TAXA.includes(taxonID)) {
                monthCount++;
                if (monthCount > maxMonthCount) {
                    maxMonthCount = monthCount;
                    return 1;
                }
            }
        }
        return 0;
    },
    () => {
        monthID = '-1|-1';
        monthCount = 0;
        maxMonthCount = 0;
    }
);
