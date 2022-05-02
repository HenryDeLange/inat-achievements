export const SPECIES_RANK = 10;
export const SUB_SPECIES_RANK = 5;
export const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

export function distance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    if ((lat1 === lat2) && (lon1 === lon2)) {
        return 0;
    }
    else {
        var radLat1 = Math.PI * lat1 / 180;
        var radLat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radTheta = Math.PI * theta / 180;
        var dist = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515; // miles
        dist = dist * 1.609344; // kilometer
        return dist;
    }
}
