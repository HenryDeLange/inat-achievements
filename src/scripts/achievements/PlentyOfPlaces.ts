import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";

let grids: string[] = [];

export default new AchievementData(
    'PlentyOfPlaces',
    20,
    (iNatObsJSON: Observation) => {
        if (iNatObsJSON.geojson && iNatObsJSON.geojson.coordinates) {
            let lat = Math.round((Math.trunc(parseFloat(iNatObsJSON.geojson?.coordinates[0]) * 10) / 10) * 2) / 2;
            let lon = Math.round((Math.trunc(parseFloat(iNatObsJSON.geojson?.coordinates[1]) * 10) / 10) * 2) / 2;
            const grid = `${lat}|${lon}`;
            if (!grids.includes(grid)) {
                console.log(grid, '=>', parseFloat(iNatObsJSON.geojson?.coordinates[0]), parseFloat(iNatObsJSON.geojson?.coordinates[1]))
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
