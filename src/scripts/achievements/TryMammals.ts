/* eslint-disable import/no-anonymous-default-export */
import { Observation } from "../../types/iNaturalistTypes";
import AchievementWrapper from "../AchievementWrapper";

const GOAL = 9;
const TAXA_DIG = [42478, 43253, 46927, 71384];
const TAXA_SWIM = [152871, 46306, 526556];
const TAXA_FLY = 40268;

let mammalDig = 0;
let mammalSwim = 0;
let mammalFly = 0;

export default new AchievementWrapper(
    'TryMammals',
    GOAL,
    () => [...TAXA_DIG, TAXA_FLY, ...TAXA_SWIM],
    (iNatObsJSON: Observation) => {
        const prevCount = Math.min(mammalDig,mammalSwim, mammalFly);
        for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
            if (TAXA_DIG.includes(taxonID)) {
                mammalDig++;
                break;
            }
            if (TAXA_SWIM.includes(taxonID)) {
                mammalSwim++;
                break;
            }
            if (TAXA_FLY === taxonID) {
                mammalFly++;
                break;
            }
        }
        const newCount = Math.min(mammalDig,mammalSwim, mammalFly);
        if (prevCount < newCount) {
            return 1;
        }
        return 0;
    },
    () => {
        mammalDig = 0;
        mammalSwim = 0;
        mammalFly = 0;
    }
);
