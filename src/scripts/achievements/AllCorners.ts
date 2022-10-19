import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

const GOAL = 4;

let northWest = false;
let northEast = false;
let southWest = false;
let southEast = false;

export default new AchievementData(
    'AllCorners',
    GOAL,
    () => [],
    (iNatObsJSON: Observation) => {
        if (iNatObsJSON.geojson && iNatObsJSON.geojson.coordinates) {
            const lon = parseFloat(iNatObsJSON.geojson.coordinates[0]);
            const lat = parseFloat(iNatObsJSON.geojson.coordinates[1]);
            if (!northWest && lat > 0 && lon < 0) {
                northWest = true;
                return 1;
            }
            if (!northEast && lat > 0 && lon > 0) {
                northEast = true;
                return 1;
            }
            if (!southWest && lat < 0 && lon < 0) {
                southWest = true;
                return 1;
            }
            if (!southEast && lat < 0 && lon > 0) {
                southEast = true;
                return 1;
            }
        }
        return 0;
    },
    () => {
        northWest = false;
        northEast = false;
        southWest = false;
        southEast = false;
    }
);
