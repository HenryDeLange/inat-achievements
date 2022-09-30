import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";
import { MILLISECONDS_PER_DAY } from "./utils";

const GOAL = 400;
const DAYS = 5;

let alwaysOnDate = new Date(Date.UTC(1980, 1, 1)).toISOString().split('T')[0];
let alwaysOnCount = 0;
let alwaysOnCountMax = 0;

export default new AchievementData(
    'AlwaysOn',
    GOAL,
    (iNatObsJSON: Observation) => {
        const obsDate = iNatObsJSON?.observed_on_details?.date ?? alwaysOnDate;
        const prevDate = new Date(Number(alwaysOnDate.substring(0, 4)), Number(alwaysOnDate.substring(5, 7)), Number(alwaysOnDate.substring(8, 10)));
        const curDate = new Date(Number(obsDate.substring(0, 4)), Number(obsDate.substring(5, 7)), Number(obsDate.substring(8, 10)));
        if (Math.ceil(Math.abs(prevDate.getTime() - curDate.getTime()) / MILLISECONDS_PER_DAY) >= DAYS) {
            alwaysOnCount = 0;
        }
        if (alwaysOnDate !== obsDate) {
            alwaysOnCount++;
            alwaysOnDate = obsDate;
        }
        if (alwaysOnCountMax < alwaysOnCount) {
            alwaysOnCountMax = alwaysOnCount;
            return 1;
        }
        return 0;
    },
    () => {
        alwaysOnDate = new Date(Date.UTC(1980, 1, 1)).toISOString().split('T')[0];
        alwaysOnCount = 0;
        alwaysOnCountMax = 0;
    }
);
