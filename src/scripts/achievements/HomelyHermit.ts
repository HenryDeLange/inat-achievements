import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

const GOAL = 24
const TAXA = [47398, 39532, 47114, 61415];
const WEEK = 7;

let days: (string | null)[] = [];

export default new AchievementData(
    'HomelyHermit',
    GOAL,
    (iNatObsJSON: Observation) => {
        for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
            if (TAXA.includes(taxonID)) {
                let date = iNatObsJSON?.observed_on_details?.date ?? null;
                if (days.length < WEEK && !days.includes(date)) {
                    days.push(date);
                    return 1;
                }
            }
        }
        return 0;
    }
);
