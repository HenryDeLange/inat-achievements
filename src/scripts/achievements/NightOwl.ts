/* eslint-disable import/no-anonymous-default-export */
import { Observation } from "../../types/iNaturalistTypes";
import AchievementWrapper from "../AchievementWrapper";

const GOAL = 12;
const TAXA = [19350, 19664, 19376, 19351];

export default new AchievementWrapper(
    'NightOwl',
    GOAL,
    () => TAXA,
    (iNatObsJSON: Observation) => {
        for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
            if (TAXA.includes(taxonID)
                    && ((iNatObsJSON?.observed_on_details?.hour ?? 99) <= 6
                        || (iNatObsJSON?.observed_on_details?.hour ?? -99) >= 18)) {
                return 1;
            }
        }
        return 0;
    }
);
