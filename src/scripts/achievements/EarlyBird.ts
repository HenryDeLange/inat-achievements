import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

let days: (string | null)[] = [];
let birdDate: string | null = null;
let wormDate: string | null = null;

export default new AchievementData(
    'EarlyBird',
    7,
    (iNatObsJSON: Observation) => {
        if ((iNatObsJSON?.observed_on_details?.hour ?? 9) <= 8) { // before 8am
            for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                if (taxonID === 3) { // bird
                    birdDate = iNatObsJSON?.observed_on_details?.date ?? null;
                }
                else if (taxonID === 47491) { // worm
                    wormDate = iNatObsJSON?.observed_on_details?.date ?? null;
                }
                if (birdDate && wormDate && birdDate === wormDate && !days.includes(birdDate)) { // only count the day once
                    days.push(birdDate);
                    return 1;
                }
            }
        }
        return 0;
    }
);
