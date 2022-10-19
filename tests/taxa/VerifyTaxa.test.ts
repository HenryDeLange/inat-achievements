import inatjs from 'inaturalistjs';
import { initAchievements, getAchievements } from '../../src/scripts/AchievementImplementations';
import { TaxaShowResponse } from '../../src/types/iNaturalistTypes';

const SLEEP_TIME = 100;

initAchievements();
const achievements = getAchievements();

jest.setTimeout(SLEEP_TIME * 10 * achievements.length * 5);

test.skip('Validate Taxa IDs', async () => {
    for (let achievement of achievements) {
        console.log(`Achievement ${achievement.title}`);
        for (let taxonID of achievement.getTaxa()) {
            // Sleep to make sure we don't spam iNat too much
            await new Promise(resolve => setTimeout(resolve, SLEEP_TIME));
            const rank = await inatjs.taxa.fetch([taxonID], {})
                .then((taxon: TaxaShowResponse) => {
                    console.log(`Fetched TaxonID ${taxonID}`);
                    if (taxon.total_results === 1) {
                        return taxon.results[0].rank_level;
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
