import { TaxaShowResponse } from '../../../types/iNaturalistTypes';

const taxa = new Map<number, number | undefined>();

// TODO: Move this caching out of the evaluate call and instead to it before the evaluations start via proper await/async calls (promises)
export default function getTaxonRank(taxonID: number): number | undefined {
    let rank = taxa.get(taxonID);
    if (!rank) {
        // TODO: Find a way to limit the number of requests to iNat
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
        console.log(taxonID, 'GET taxon rank', rank)
        taxa.set(taxonID, rank);
    }
    return rank;
}
