import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";
import { CLASS_RANK } from "./utils";
import getTaxonRank from "./utils/TaxonCache";

const GOAL = 16;

let classCount: number[] = [];

export default new AchievementData(
    'WorldClass',
    GOAL,
    (iNatObsJSON: Observation) => {
        return new Promise<number>(async (resolve) => {
            for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                const rank = await getTaxonRank(taxonID).then(taxonRank => taxonRank);
                console.log(taxonID, `Using rank = ${rank}`);
                if (rank) {
                    if (rank === CLASS_RANK) {
                        if (!classCount.includes(taxonID)) {
                            classCount.push(taxonID);
                            resolve(1);
                            return;
                        }
                    }
                    if (rank <= CLASS_RANK)
                        break;
                }
            }
            resolve(0);
        });
    },
    () => {
        classCount = [];
    }
);
