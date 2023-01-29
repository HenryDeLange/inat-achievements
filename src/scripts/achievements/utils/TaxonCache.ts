import { TaxonRankCacheType } from '../../../types/AchievementsTypes';
import { TaxaShowResponse } from '../../../types/iNaturalistTypes';

const taxa = new Map<number, number>();

export function populateTaxonRank(taxonID: number, rank: number) {
    taxa.set(taxonID, rank);
}

export function populateAllTaxonRanks(taxaRanks: TaxonRankCacheType[]) {
    taxaRanks.forEach((value, index) => populateTaxonRank(value.taxonID, value.rank));
}

export function isTaxonCached(taxonID: number): boolean {
    return taxa.get(taxonID) ? true : false;
}

export function getTaxonRanksAsTaxonRankCacheType(): TaxonRankCacheType[] {
    const taxonRankCache: TaxonRankCacheType[] = [];
    taxa.forEach((rank, taxonID) => taxonRankCache.push({ taxonID, rank }));
    return taxonRankCache;
}

export function getTaxonRank(taxonID: number): number | undefined {
    let rank = taxa.get(taxonID);
    if (!rank) {
        // This should never happen because the caching is done before had. This code is here to log and handle cache misses.
        console.warn(`Rank not cached for taxon ${taxonID}. Will try to get it from iNaturalist...`);
        const xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let iNatTaxon: TaxaShowResponse = JSON.parse(this.responseText);
                if (iNatTaxon.total_results === 1) {
                    rank = iNatTaxon.results[0].rank_level;
                }
            }
            else if (this.readyState === 4) {
                console.error(`Error processing ${taxonID}: ${this.status} - ${this.responseText}`);
            }
        }
        xmlHttpRequest.open('GET', `https://api.inaturalist.org/v1/taxa/${taxonID}`, false); // Use "false" to force it to be synchronous
        xmlHttpRequest.send();
        taxa.set(taxonID, rank ?? -1);
    }
    return rank;
}
