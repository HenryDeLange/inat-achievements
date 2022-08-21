import { Observation } from "../../types/iNaturalistTypes";
import AchievementData from "../AchievementData";
import { SPECIES_RANK } from "./utils";

let grids: string[] = [];

export default new AchievementData(
    'Scatter',
    25,
    (iNatObsJSON: Observation) => {
        if ((iNatObsJSON?.taxon?.rank_level ?? 999) <= SPECIES_RANK
                && iNatObsJSON.geojson && iNatObsJSON.geojson.coordinates) {
            for (const annotation of iNatObsJSON.annotations ?? []) {
                if (annotation.controlled_attribute_id === 22 && annotation.controlled_value_id === 25) {
                    let lon = Math.round((Math.trunc(parseFloat(iNatObsJSON.geojson?.coordinates[0]) * 10) / 10) * 4) / 4;
                    let lat = Math.round((Math.trunc(parseFloat(iNatObsJSON.geojson?.coordinates[1]) * 10) / 10) * 4) / 4;
                    const grid = `${lat}|${lon}`;
                    if (!grids.includes(grid)) {
                        grids.push(grid);
                        return 1;
                    }
                }
            }
        }
        return 0;
    },
    () => {
        grids = [];
    }
);
