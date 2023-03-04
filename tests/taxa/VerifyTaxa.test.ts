import inatjs from 'inaturalistjs';
import { TaxaShowResponse } from '../../src/types/iNaturalistTypes';
import { getAchievementWrappers } from '../../src/scripts/workers/worker';
import { splitArrayIntoChunks } from '../../src/scripts/achievements/utils';
import { TaxonRankCacheType } from '../../src/types/AchievementsTypes';

const SLEEP_TIME = 60 * 1000 / 65; // 65 per minute

const achievements = getAchievementWrappers();

jest.setTimeout(SLEEP_TIME * achievements.length * 5 + 150);

function testConditionally(shouldTest: boolean, name: string, func: jest.ProvidesCallback | undefined) {
    shouldTest ? test(name, func) : test.skip(name, func);
}
const runVerifyTaxa = process.argv.includes(`--run-verify-taxa`);

testConditionally(runVerifyTaxa, 'Validate Taxa IDs', async () => {
    const allTaxaIDs: number[] = [];
    for (let achievement of achievements) {
        for (let taxonID of achievement.getTaxa()) {
            if (allTaxaIDs.indexOf(taxonID) === -1) {
                allTaxaIDs.push(taxonID);
            }
        }
    }
    console.log(`Taxon IDs to be checked: ${allTaxaIDs}`);
    const allTaxaRanks: TaxonRankCacheType[] = [];
    const taxaChunks = splitArrayIntoChunks(allTaxaIDs, 30);
    for (let taxaChunk of taxaChunks) {
        // Sleep to make sure we don't spam iNat too much
        await new Promise(resolve => setTimeout(resolve, SLEEP_TIME));
        // Fetch the next chunk of taxon information
        const taxaRanks: TaxonRankCacheType[] = await inatjs.taxa.fetch([taxaChunk])
            .then((response: TaxaShowResponse) => {
                const chunkTaxaRanks: TaxonRankCacheType[] = [];
                for (let taxonInfo of response.results) {
                    console.log(`Fetched TaxonID ${taxonInfo.id} with Rank ${taxonInfo.rank_level} and Active status of ${taxonInfo.is_active}`);
                    if (taxonInfo.is_active) {
                        chunkTaxaRanks.push({
                            taxonID: taxonInfo.id,
                            rank: taxonInfo.rank_level ?? -1
                        });
                    }
                    else {
                        chunkTaxaRanks.push({
                            taxonID: taxonInfo.id,
                            rank: -9
                        });
                    }
                }
                return chunkTaxaRanks;
            })
            .catch((e: any) => {
                console.error(e);
                return null;
            });
        if (taxaRanks) {
            allTaxaRanks.push(...taxaRanks);
        }
    }
    expect(allTaxaRanks.length).not.toBe(0);
    expect(allTaxaRanks.length).toBe(allTaxaIDs.length);
    for (let taxonRank of allTaxaRanks) {
        expect(taxonRank.rank).not.toBeLessThan(1);
    }
});
