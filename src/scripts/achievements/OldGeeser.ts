import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";
import { getDayOfYear } from "./utils";

let yearsAgo = 0;

export default new AchievementData(
    'OldGeeser',
    25,
    (iNatObsJSON: Observation) => {
        for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
            if ([6912].includes(taxonID)) {
                let obsDate = new Date(iNatObsJSON?.observed_on_details?.year ?? 0, iNatObsJSON?.observed_on_details?.month ?? 0, iNatObsJSON?.observed_on_details?.day ?? 0);
                let currentDate = new Date();
                if (obsDate < currentDate) {
                    let obsYearsAgo = currentDate.getFullYear() - obsDate.getFullYear();
                    // Check to make sure a full year has passed, otherwise don't count the partial year
                    if (obsYearsAgo >= 1 && getDayOfYear(obsDate) > getDayOfYear(currentDate)) {
                        obsYearsAgo--;
                    }
                    if (yearsAgo > obsYearsAgo) {
                        const delta = obsYearsAgo - yearsAgo;
                        yearsAgo = obsYearsAgo;
                        return delta;
                    }
                }
            }
        }
        return 0;
    },
    () => {
        yearsAgo = 0;
    }
);
