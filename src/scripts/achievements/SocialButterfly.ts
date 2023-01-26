/* eslint-disable import/no-anonymous-default-export */
import { Observation } from "../../types/iNaturalistTypes";
import AchievementWrapper from "../AchievementWrapper";

const GOAL = 30;
const TAXA = 47224;

// TODO: Make sure this also counts comments inside identifications?
export default new AchievementWrapper(
    'SocialButterfly',
    GOAL,
    () => [TAXA],
    (iNatObsJSON: Observation) => {
        if ((iNatObsJSON?.comments_count ?? 0) > 0) {
            for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
                if (TAXA === taxonID) {
                    return 1;
                }
            }
        }
        return 0;
    }
);
