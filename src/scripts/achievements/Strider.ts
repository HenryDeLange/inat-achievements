/* eslint-disable import/no-anonymous-default-export */
import { Observation } from "../../types/iNaturalistTypes";
import AchievementWrapper from "../AchievementWrapper";
import { distance } from "./utils";

const GOAL = 500;

declare type LatLon = {
    obsID: number;
    lat: number;
    lon: number;
}

const obsPerDay = new Map<string, LatLon[]>();
let maxDistance = 0;

const achievement = new AchievementWrapper(
    'Strider',
    GOAL,
    () => [],
    (iNatObsJSON: Observation) => {
        if (iNatObsJSON.geojson && iNatObsJSON.geojson.coordinates 
                && iNatObsJSON.geojson.coordinates.length === 2 && iNatObsJSON?.observed_on_details?.date) {
            const key = iNatObsJSON.observed_on_details.date;
            let dayObs = obsPerDay.get(key);
            if (!dayObs) {
                dayObs = [];
                obsPerDay.set(key, dayObs);
            }
            const newObs = {
                obsID: iNatObsJSON.id ?? 0,
                lon: parseFloat(iNatObsJSON.geojson.coordinates[0]),
                lat: parseFloat(iNatObsJSON.geojson.coordinates[1])
            };
            dayObs.push(newObs);
            if (dayObs.length > 1) {
                for (const tempObs of dayObs) {
                    let obsDistance = Math.round(distance(newObs.lat, newObs.lon, tempObs.lat, tempObs.lon));
                    if (obsDistance > maxDistance) {
                        const difference = obsDistance - maxDistance;
                        maxDistance = obsDistance;
                        // Replace the achievement's Observations array with the new data
                        // (only add the old observation, the new one gets added automatically by AchievementWrapper)
                        achievement.getData().observations = [ tempObs.obsID ];
                        return difference;
                    }
                }
            }
        }
        return 0;
    },
    () => {
        obsPerDay.clear();
        maxDistance = 0;
    }
);

export default achievement;
