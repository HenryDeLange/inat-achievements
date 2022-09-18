import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

const GOAL = 20;

let grids: string[] = [];

export default new AchievementData(
    'PlentyOfPlaces',
    GOAL,
    (iNatObsJSON: Observation) => {
        if (iNatObsJSON.geojson && iNatObsJSON.geojson.coordinates) {
            let lon = Math.round((Math.trunc(parseFloat(iNatObsJSON.geojson.coordinates[0]) * 10) / 10) * 2) / 2;
            let lat = Math.round((Math.trunc(parseFloat(iNatObsJSON.geojson.coordinates[1]) * 10) / 10) * 2) / 2;
            const grid = `${lat}|${lon}`;
            if (!grids.includes(grid)) {
                grids.push(grid);
                return 1;
            }
        }
        return 0;
    },
    () => {
        grids = [];
    }
);
