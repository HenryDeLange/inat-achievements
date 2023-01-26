import AchievementWrapper from '../../src/scripts/AchievementWrapper';
import FlowerChild from '../../src/scripts/achievements/FlowerChild';
import { ORDER_RANK, SPECIES_RANK, SUB_SPECIES_RANK } from '../../src/scripts/achievements/utils';
import { getTaxonRanksAsTaxonRankCacheType, populateTaxonRank } from '../../src/scripts/achievements/utils/TaxonCache';
import { TaxonRankCacheType } from '../../src/types/AchievementsTypes';

const achievement: AchievementWrapper = FlowerChild;

let taxonRankCache: TaxonRankCacheType[] = [];

beforeAll(() => {
    populateTaxonRank(1, 100);
    populateTaxonRank(2, 90);
    populateTaxonRank(3, 80);
    populateTaxonRank(4, 70);
    populateTaxonRank(5, 60);
    populateTaxonRank(47125, ORDER_RANK + 1);
    populateTaxonRank(111, ORDER_RANK);
    populateTaxonRank(222, ORDER_RANK);
    populateTaxonRank(333, ORDER_RANK);
    taxonRankCache = getTaxonRanksAsTaxonRankCacheType();
});

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 4, 47125, 111],
            rank_level: ORDER_RANK
        }
    }, taxonRankCache);
    expect(achievement.data.count).toEqual(1);
    achievement.reset();
    expect(achievement.data.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 4, 47125, 111],
            rank_level: SPECIES_RANK
        }
    }, taxonRankCache);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 4, 47125, 222],
            rank_level: ORDER_RANK
        }
    }, taxonRankCache);
    expect(achievement.data.count).toEqual(2);
});

test('Don\'t Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 4, 5, 111],
            rank_level: ORDER_RANK
        }
    }, taxonRankCache);
    expect(achievement.data.count).toEqual(0);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 4, 47125, 222],
            rank_level: ORDER_RANK + 1
        }
    }, taxonRankCache);
    expect(achievement.data.count).toEqual(0);
});

test('Duplicates', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 4, 47125, 111],
            rank_level: ORDER_RANK
        }
    }, taxonRankCache);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 4, 47125, 111],
            rank_level: ORDER_RANK
        }
    }, taxonRankCache);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 4, 47125, 111],
            rank_level: SPECIES_RANK
        }
    }, taxonRankCache);
    expect(achievement.data.count).toEqual(1);
});

test('Gaps', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 47125, 5, 111],
            rank_level: ORDER_RANK
        }
    }, taxonRankCache);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 4, 47125, 222, 22, 2],
            rank_level: SPECIES_RANK
        }
    }, taxonRankCache);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47125, 1, 2, 3, 4, 333],
            rank_level: SUB_SPECIES_RANK
        }
    }, taxonRankCache);
    expect(achievement.data.count).toEqual(3);
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
