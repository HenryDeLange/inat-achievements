import inatjs from 'inaturalistjs';
import { TaxaShowResponse } from '../../../types/iNaturalistTypes';

const taxa = new Map<number, number | undefined>();

export default async function getTaxonRank(taxonID: number): Promise<number | undefined> {
    let rank = taxa.get(taxonID);
    if (!rank) {
        rank = inatjs.taxa.fetch(taxonID)
            .then((iNatTaxon: TaxaShowResponse) => {
                if (iNatTaxon.total_results === 1) {
                    const foundRank = iNatTaxon.results[0].rank_level;
                    return foundRank;
                }
                return undefined;
            })
            .catch((e: any) => console.error(e));
        taxa.set(taxonID, rank);
    }
    return rank;
}
