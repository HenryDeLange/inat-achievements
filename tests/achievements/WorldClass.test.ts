import AchievementData from '../../src/scripts/AchievementData';
import { CLASS_RANK } from '../../src/scripts/achievements/utils';
import { populateTaxonRank } from '../../src/scripts/achievements/utils/TaxonCache';
import WorldClass from '../../src/scripts/achievements/WorldClass';

const achievement: AchievementData = WorldClass;

beforeAll(() => {
    populateTaxonRank(1, 100);
    populateTaxonRank(2, 90);
    populateTaxonRank(3, 80);
    populateTaxonRank(4, 70);
    populateTaxonRank(5, 60);
    populateTaxonRank(61, CLASS_RANK);
    populateTaxonRank(62, CLASS_RANK);
});

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 4, 5, 61],
            rank_level: CLASS_RANK
        }
    });
    expect(achievement.count).toEqual(1);
    achievement.reset();
    expect(achievement.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 4, 5, 61],
            rank_level: CLASS_RANK
        }
    });
    expect(achievement.count).toEqual(1);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 62, 7, 8, 9],
            rank_level: CLASS_RANK
        }
    });
    expect(achievement.count).toEqual(2);
});

test('Don\'t Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 4, 5],
            rank_level: CLASS_RANK
        }
    });
    expect(achievement.count).toEqual(0);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 4, 5, 61],
            rank_level: CLASS_RANK + 1
        }
    });
    expect(achievement.count).toEqual(0);
});

test('Duplicates', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 4, 5, 61],
            rank_level: CLASS_RANK
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 4, 5, 61],
            rank_level: CLASS_RANK
        }
    });
    expect(achievement.count).toEqual(1);
});

test('Gaps', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 5, 61, 7, 8],
            rank_level: CLASS_RANK
        }
    });
    expect(achievement.count).toEqual(1);
});

test('Missing Data', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: undefined,
            rank_level: undefined
        }
    });
    achievement.evaluate({
        taxon: undefined
    });
    expect(achievement.count).toEqual(0);
});
