import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";
import { MILLISECONDS_PER_DAY } from "./utils";

let alwaysOnDate = new Date(Date.UTC(1980, 1, 1)).toISOString().split('T')[0];
let alwaysOnCount = 0;
let alwaysOnCountMax = 0;

export default new AchievementData(
    'AlwaysOn',
    400,
    (iNatObsJSON: Observation) => {
        let obsDate = iNatObsJSON?.observed_on_details?.date ?? alwaysOnDate;
        var date1 = new Date(Number(alwaysOnDate.substring(0, 5)), Number(alwaysOnDate.substring(5, 8)), Number(alwaysOnDate.substring(8, 10)));
        var date2 = new Date(Number(obsDate.substring(0, 5)), Number(obsDate.substring(5, 8)), Number(obsDate.substring(8, 10)));
        if (Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / MILLISECONDS_PER_DAY) > 5) {
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
