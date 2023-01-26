/* eslint-disable import/no-anonymous-default-export */
import { Observation } from "../../types/iNaturalistTypes";
import AchievementWrapper from "../AchievementWrapper";

const GOAL = 33;
const TAXA = 47178;

// TODO: Instead count all fish species observed during a set period? Or combine with the King-Fisher bird?
export default new AchievementWrapper(
    'KingFisher',
    GOAL,
    () => [TAXA],
    (iNatObsJSON: Observation) => {
        for (let taxonID of iNatObsJSON?.taxon?.ancestor_ids ?? []) {
            if (TAXA === taxonID) {
                return 1;
            }
        }
        return 0;
    }
);
