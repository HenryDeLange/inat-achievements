import { TaxonRankCacheType } from '../../../types/AchievementsTypes';
import { TaxaShowResponse } from '../../../types/iNaturalistTypes';

const taxa = new Map<number, number>();

export function populateTaxonRank(taxonID: number, rank: number, skipLocalStorage?: boolean) {
    taxa.set(taxonID, rank);
    if (!skipLocalStorage) {
        localStorage.setItem(taxonID.toString(), rank.toString());
    }
}

export function getTaxonRank(taxonID: number, fetchIfAbsent: boolean): number | null {
    // First try to get the rank from the in memory map
    const rank = taxa.get(taxonID);
    if (rank) {
        return rank;
    }
    // If not found in memory, then try to load from LocalStorage
    if (!rank) {
        const storageRank = localStorage.getItem(taxonID.toString());
        if (storageRank) {
            const storageRankNumber = parseInt(storageRank);
            taxa.set(taxonID, storageRankNumber);
            return storageRankNumber;
        }
    }
    // If still not found, then try to load it from iNaturalist
    if (fetchIfAbsent && !rank) {
        // This should never happen because the caching is done before had. This code is here to log and handle cache misses.
        console.warn(`Rank not cached for taxon ${taxonID}. Will try to get it from iNaturalist...`);
        const xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let iNatTaxon: TaxaShowResponse = JSON.parse(this.responseText);
                if (iNatTaxon.total_results === 1) {
                    const fetchedRank = iNatTaxon.results[0].rank_level;
                    if (fetchedRank) {
                        populateTaxonRank(taxonID, fetchedRank);
                        return fetchedRank;
                    }
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
    return null;
}

export function getTaxonRanksAsTaxonRankCacheType(): TaxonRankCacheType[] {
    const taxonRankCache: TaxonRankCacheType[] = [];
    taxa.forEach((rank, taxonID) => taxonRankCache.push({ taxonID, rank }));
    return taxonRankCache;
}
