import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

let weeksWithFlowers: number[] = [];

export default new AchievementData(
    'ForeverSpring',
    52,
    (iNatObsJSON: Observation) => {
        let key = iNatObsJSON.created_at_details && iNatObsJSON.created_at_details.week ? iNatObsJSON.created_at_details.week : undefined;
        if (key) {
            if (key > 52) {
                // Not sure if this is needed, but group the last day(s) of the year into the last week of the year
                key = 52;
            }
            for (const annotation of iNatObsJSON.annotations ?? []) {
                if (annotation.controlled_attribute_id === 12 && annotation.controlled_value_id === 13) {
                    for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                        if (47125 === taxonID) {
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
