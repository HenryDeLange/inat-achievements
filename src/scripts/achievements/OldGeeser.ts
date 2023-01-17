import { differenceInYears } from "date-fns";
import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

const GOAL = 25;
const TAXA = 6912;

let maxYearsAgo = 0;

export default new AchievementData(
    'OldGeeser',
    GOAL,
    () => [TAXA],
    (iNatObsJSON: Observation) => {
        for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
            if (TAXA === taxonID) {
                const obsYear = iNatObsJSON?.observed_on_details?.year ?? -1;
                const obsMonth = iNatObsJSON?.observed_on_details?.month ?? -1;
                const obsDay = iNatObsJSON?.observed_on_details?.day ?? -1;
                if (obsYear >= 0 && obsMonth >= 0 && obsDay >= 0) {
                    const obsDate = new Date(obsYear, obsMonth, obsDay);
                    const currentDate = new Date();
                    if (obsDate < currentDate) {
                        const obsYearsAgo = differenceInYears(currentDate, obsDate);
                        if (obsYearsAgo > maxYearsAgo) {
                            const delta = obsYearsAgo - maxYearsAgo;
                            maxYearsAgo = obsYearsAgo;
                            return delta;
                        }
                    }
                }
            }
        }
        return 0;
    },
    () => {
        maxYearsAgo = 0;
    }
);
