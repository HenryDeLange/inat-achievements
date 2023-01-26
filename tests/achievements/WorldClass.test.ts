import AchievementWrapper from '../../src/scripts/AchievementWrapper';
import { CLASS_RANK } from '../../src/scripts/achievements/utils';
import { getTaxonRanksAsTaxonRankCacheType, populateTaxonRank } from '../../src/scripts/achievements/utils/TaxonCache';
import WorldClass from '../../src/scripts/achievements/WorldClass';
import { TaxonRankCacheType } from '../../src/types/AchievementsTypes';

const achievement: AchievementWrapper = WorldClass;

let taxonRankCache: TaxonRankCacheType[] = [];

beforeAll(() => {
    populateTaxonRank(1, 100);
    populateTaxonRank(2, 90);
    populateTaxonRank(3, 80);
    populateTaxonRank(4, 70);
    populateTaxonRank(5, 60);
    populateTaxonRank(61, CLASS_RANK);
    populateTaxonRank(62, CLASS_RANK);
    taxonRankCache = getTaxonRanksAsTaxonRankCacheType();
});

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 4, 5, 61],
            rank_level: CLASS_RANK
        }
    }, taxonRankCache);
    expect(achievement.data.count).toEqual(1);
    achievement.reset();
    expect(achievement.data.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 4, 5, 61],
            rank_level: CLASS_RANK
        }
    }, taxonRankCache);
    expect(achievement.data.count).toEqual(1);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 62, 7, 8, 9],
            rank_level: CLASS_RANK
        }
    }, taxonRankCache);
    expect(achievement.data.count).toEqual(2);
});

test('Don\'t Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 4, 5],
            rank_level: CLASS_RANK
        }
    }, taxonRankCache);
    expect(achievement.data.count).toEqual(0);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 4, 5, 61],
            rank_level: CLASS_RANK + 1
        }
    }, taxonRankCache);
    expect(achievement.data.count).toEqual(0);
});

test('Duplicates', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 4, 5, 61],
            rank_level: CLASS_RANK
        }
    }, taxonRankCache);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 4, 5, 61],
            rank_level: CLASS_RANK
        }
    }, taxonRankCache);
    expect(achievement.data.count).toEqual(1);
});

test('Gaps', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 5, 61, 7, 8],
            rank_level: CLASS_RANK
        }
    }, taxonRankCache);
    expect(achievement.data.count).toEqual(1);
});

test('Missing Data', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: undefined,
            rank_level: undefined
        }
    }, taxonRankCache);
    achievement.evaluate({
        taxon: {
            ancestor_ids: undefined,
            rank_level: undefined
        }
    });
    achievement.evaluate({
        taxon: undefined
    }, taxonRankCache);
    achievement.evaluate({
        taxon: undefined
    });
    expect(achievement.data.count).toEqual(0);
});
