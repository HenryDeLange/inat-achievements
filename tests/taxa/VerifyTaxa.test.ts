import inatjs from 'inaturalistjs';
import { initAchievements, getAchievements } from '../../src/scripts/AchievementImplementations';
import { TaxaShowResponse } from '../../src/types/iNaturalistTypes';

const SLEEP_TIME = 60 * 1000 / 80; // 80 per minute

initAchievements();
const achievements = getAchievements();

jest.setTimeout(SLEEP_TIME * achievements.length * 5 + 150);

function testConditionally(shouldTest: boolean, name: string, func: jest.ProvidesCallback | undefined) {
    shouldTest ? test(name, func) : test.skip(name, func);
}
const runVerifyTaxa = process.argv.includes(`--run-verify-taxa`);

testConditionally(runVerifyTaxa, 'Validate Taxa IDs', async () => {
    for (let achievement of achievements) {
        console.log(`Achievement ${achievement.icon}`);
        for (let taxonID of achievement.getTaxa()) {
            // Sleep to make sure we don't spam iNat too much
            await new Promise(resolve => setTimeout(resolve, SLEEP_TIME));
            const rank = await inatjs.taxa.fetch([taxonID], {})
                .then((response: TaxaShowResponse) => {
                    console.log(`Fetched TaxonID ${taxonID} (${new Date().toISOString()})`);
                    if (response.total_results === 1) {
                        const taxon = response.results[0];
                        if (taxon.is_active) {
                            return taxon.rank_level;
                        }
                    }
                    return null;
                })
                .catch((e: any) => {
                    console.error(e);
                    return null;
                });
            console.log(`Rank is ${rank}`);
            expect(rank).not.toBeNull();
        }
    }
});
