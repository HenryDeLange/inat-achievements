import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

// Make 7 observations over 7 days of any Hermit Crab, Tortoise, Turtle, Snail and Bagworm Moths species.

let days: (string | null)[] = [];

export default new AchievementData(
    'HomelyHermit',
    24,
    (iNatObsJSON: Observation) => {
        for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
            if ([47398, 39532, 47114, 61415].includes(taxonID)) {
                let date = iNatObsJSON?.observed_on_details?.date ?? null;
                if (days.length < 7 && !days.includes(date)) {
                    days.push(date);
                    return 1;
                }
            }
        }
        return 0;
    }
);
