import AchievementWrapper from '../../src/scripts/AchievementWrapper';
import TentacleSuckers from '../../src/scripts/achievements/TentacleSuckers';
import { SPECIES_RANK, SUB_SPECIES_RANK } from '../../src/scripts/achievements/utils';

const achievement: AchievementWrapper = TentacleSuckers;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 47459, 5, 6, 7],
            id: 1,
            rank_level: SPECIES_RANK
        }
    });
    expect(achievement.data.count).toEqual(1);
    achievement.reset();
    expect(achievement.data.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47459],
            id: 1,
            rank_level: SPECIES_RANK
        }
    });
    expect(achievement.data.count).toEqual(1);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47797],
            id: 2,
            rank_level: SPECIES_RANK
        }
    });
    expect(achievement.data.count).toEqual(2);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [48332],
            parent_id: 3,
            rank_level: SUB_SPECIES_RANK
        }
    });
    expect(achievement.data.count).toEqual(3);
});

test('Don\'t Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1],
            id: 1,
            rank_level: SPECIES_RANK
        }
    });
    expect(achievement.data.count).toEqual(0);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [48332],
            id: 1,
            rank_level: SPECIES_RANK + 1
        }
    });
    expect(achievement.data.count).toEqual(0);
});

test('Duplicates', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [48332],
            id: 1,
            rank_level: SPECIES_RANK
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [48332],
            id: 1,
            rank_level: SPECIES_RANK
        }
    });
    expect(achievement.data.count).toEqual(1);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [48332],
            parent_id: 1,
            rank_level: SUB_SPECIES_RANK
        }
    });
    expect(achievement.data.count).toEqual(1);
});

test('Missing Data', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: undefined,
            id: undefined,
            parent_id: undefined,
            rank_level: undefined
        }
    });
    achievement.evaluate({
        taxon: undefined,
        observed_on_details: undefined
    });
    expect(achievement.data.count).toEqual(0);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [48332],
            id: undefined,
            rank_level: SPECIES_RANK
        }
    });
    expect(achievement.data.count).toEqual(0);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [48332],
            parent_id: undefined,
            rank_level: SUB_SPECIES_RANK
        }
    });
    expect(achievement.data.count).toEqual(0);
});
