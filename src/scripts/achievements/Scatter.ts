/* eslint-disable import/no-anonymous-default-export */
import { Observation } from "../../types/iNaturalistTypes";
import AchievementWrapper from "../AchievementWrapper";
import { SPECIES_RANK } from "./utils";

const GOAL = 16;
const ANNOTATION_ATTRIBUTE = 22;
const ANNOTATION_VALUE = 25;

let grids: string[] = [];

export default new AchievementWrapper(
    'Scatter',
    GOAL,
    () => [],
    (iNatObsJSON: Observation) => {
        if (iNatObsJSON.annotations
                && (iNatObsJSON?.taxon?.rank_level ?? 999) <= SPECIES_RANK
                && iNatObsJSON.geojson && iNatObsJSON.geojson.coordinates) {
            for (const annotation of iNatObsJSON.annotations) {
                if (annotation.controlled_attribute_id === ANNOTATION_ATTRIBUTE
                        && annotation.controlled_value_id === ANNOTATION_VALUE) {
                    const lon = Math.round((Math.trunc(parseFloat(iNatObsJSON.geojson?.coordinates[0]) * 1000) / 1000) * 4) / 4;
                    const lat = Math.round((Math.trunc(parseFloat(iNatObsJSON.geojson?.coordinates[1]) * 1000) / 1000) * 4) / 4;
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
