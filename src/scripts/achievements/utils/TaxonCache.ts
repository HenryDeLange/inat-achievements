import { TaxonRankCacheType } from '../../../types/AchievementsTypes';

const taxa = new Map<number, number>();

export function populateTaxonRank(taxonID: number, rank: number, skipLocalStorage?: boolean) {
    taxa.set(taxonID, rank);
    if (!skipLocalStorage) {
        localStorage.setItem(taxonID.toString(), rank.toString());
    }
}

export function getTaxonRank(taxonID: number): number | null {
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
    return null;
}

export function getTaxonRanksAsTaxonRankCacheType(): TaxonRankCacheType[] {
    const taxonRankCache: TaxonRankCacheType[] = [];
    taxa.forEach((rank, taxonID) => taxonRankCache.push({ taxonID, rank }));
    return taxonRankCache;
}
