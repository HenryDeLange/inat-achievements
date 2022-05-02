import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

let monthID = '-1|-1';
let monthCount = 0;
let maxMonthCount = 0;

export default new AchievementData(
    'EmployeeOfTheMonth',
    31,
    (iNatObsJSON: Observation) => {
        let obsMonthID = `${iNatObsJSON.created_at_details?.year ?? -1}|${iNatObsJSON.created_at_details?.month ?? -1}`;
        if (monthID !== obsMonthID) {
            monthID = obsMonthID;
            monthCount = 0;
        }
        for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
            if ([118903, 47336, 538904].includes(taxonID)) {
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
