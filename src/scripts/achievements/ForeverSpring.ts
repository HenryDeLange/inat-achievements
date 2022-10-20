import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

const GOAL = 52;
const TAXA = 47125;
const ANNOTATION_ATTRIBUTE = 12;
const ANNOTATION_VALUE = 13;

let weeksWithFlowers: number[] = [];

export default new AchievementData(
    'ForeverSpring',
    GOAL,
    () => [TAXA],
    (iNatObsJSON: Observation) => {
        let key = iNatObsJSON.observed_on_details?.week;
        if (key) {
            if (key > GOAL) {
                // Not sure if this is needed, but group the last day(s) of the year into the last week of the year
                key = GOAL;
            }
            for (const annotation of iNatObsJSON.annotations ?? []) {
                if (annotation.controlled_attribute_id === ANNOTATION_ATTRIBUTE
                        && annotation.controlled_value_id === ANNOTATION_VALUE) {
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
