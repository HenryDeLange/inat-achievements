import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

let classCount: number[] = [];

export default new AchievementData(
    'WorldClass',
    16,
    (iNatObsJSON: Observation) => {
        let classID = iNatObsJSON?.taxon?.iconic_taxon_id ?? -1;
        if (!classCount.includes(classID)) {
            classCount.push(classID);
            return 1;
        }
        return 0;
    },
    () => {
        classCount = [];
    }
);
