import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

const GOAL = 52;
const TAXA = 47125;

let weeksWithFlowers: number[] = [];

export default new AchievementData(
    'ForeverSpring',
    GOAL,
    (iNatObsJSON: Observation) => {
        let key = iNatObsJSON.observed_on_details && iNatObsJSON.observed_on_details.week ? iNatObsJSON.observed_on_details.week : undefined;
        if (key) {
            if (key > GOAL) {
                // Not sure if this is needed, but group the last day(s) of the year into the last week of the year
                key = GOAL;
            }
            for (const annotation of iNatObsJSON.annotations ?? []) {
                if (annotation.controlled_attribute_id === 12 && annotation.controlled_value_id === 13) {
                    for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                        if (TAXA === taxonID) {
                            if (!weeksWithFlowers.includes(key)) {
                                weeksWithFlowers.push(key);
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
        weeksWithFlowers = [];
    }
);
