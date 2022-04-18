import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

let mammalDig = 0;
let mammalSwim = 0;
let mammalFly = 0;

export default new AchievementData(
    'TryMammals',
    9,
    (iNatObsJSON: Observation) => {
        const oldMammalDig = mammalDig;
        const oldMammalSwim = mammalSwim;
        const oldMammalFly = mammalFly;
        for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
            // digging
            if ([42478, 43253, 46927, 71384].includes(taxonID)) {
                mammalDig++;
                break;
            }
            // swimming
            if ([152871, 46306, 526556].includes(taxonID)) {
                mammalSwim++;
                break;
            }
            // flying
            if ([40268].includes(taxonID)) {
                mammalFly++;
                break;
            }
        }
        return (mammalDig <= 3 ? mammalDig - oldMammalDig : 0)
            + (mammalSwim <= 3 ? mammalSwim - oldMammalSwim : 0)
            + (mammalFly <= 3 ? mammalFly - oldMammalFly : 0);
    },
    () => {
        mammalDig = 0;
        mammalSwim = 0;
        mammalFly = 0;
    }
);
