import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

const GOAL = 7;
const TAXA_BIRD = 3;
const TAXA_WORM = 47491;

let days: (string | null)[] = [];
let birdDate: string | null = null;
let wormDate: string | null = null;

export default new AchievementData(
    'EarlyBird',
    GOAL,
    () => [TAXA_BIRD, TAXA_WORM],
    (iNatObsJSON: Observation) => {
        if ((iNatObsJSON?.observed_on_details?.hour ?? 99) <= GOAL) { // before 7AM
            for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                if (taxonID === TAXA_BIRD) {
                    birdDate = iNatObsJSON?.observed_on_details?.date ?? null;
                }
                else if (taxonID === TAXA_WORM) {
                    wormDate = iNatObsJSON?.observed_on_details?.date ?? null;
                }
                if (birdDate && wormDate && birdDate === wormDate && !days.includes(birdDate)) { // only count the day once
                    days.push(birdDate);
                    return 1;
                }
            }
        }
        return 0;
    },
    () => {
        days = [];
        birdDate = null;
        wormDate = null;
    }
);
