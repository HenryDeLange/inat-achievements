import AchievementData from '../../src/scripts/AchievementData';
import SuperStar from '../../src/scripts/achievements/SuperStar';
import { SPECIES_RANK, SUB_SPECIES_RANK } from '../../src/scripts/achievements/utils';

const achievement: AchievementData = SuperStar;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 481959, 5, 6, 7],
            rank_level: SPECIES_RANK,
            id: 1
        }
    });
    expect(achievement.count).toEqual(1);
    achievement.reset();
    expect(achievement.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [481959],
            rank_level: SPECIES_RANK,
            id: 1
        }
    });
    expect(achievement.count).toEqual(1);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [481959],
            rank_level: SUB_SPECIES_RANK,
            parent_id: 2
        }
    });
    expect(achievement.count).toEqual(2);
});

test('Don\'t Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1],
            rank_level: SPECIES_RANK,
            id: 1
        }
    });
    expect(achievement.count).toEqual(0);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [481959],
            rank_level: SPECIES_RANK + 1,
            id: 1
        }
    });
    expect(achievement.count).toEqual(0);
});

test('Duplicates', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [481959],
            rank_level: SPECIES_RANK,
            id: 1
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [481959],
            rank_level: SPECIES_RANK,
            id: 1
        }
    });
    expect(achievement.count).toEqual(1);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [481959],
            rank_level: SUB_SPECIES_RANK,
            parent_id: 1
        }
    });
    expect(achievement.count).toEqual(1);
});

test('Missing Data', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [481959],
            rank_level: SPECIES_RANK,
            id: undefined
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [481959],
            rank_level: SUB_SPECIES_RANK,
            parent_id: undefined
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: undefined,
            rank_level: undefined,
            id: undefined,
            parent_id: undefined
        }
    });
    achievement.evaluate({
        taxon: undefined
    });
    expect(achievement.count).toEqual(0);
});
