import AchievementWrapper from '../../src/scripts/AchievementWrapper';
import Microcosm from '../../src/scripts/achievements/Microcosm';

const achievement: AchievementWrapper = Microcosm;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 123880, 5, 6, 7]
        }
    });
    expect(achievement.data.count).toEqual(1);
    achievement.reset();
    expect(achievement.data.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [123880]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [67333]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [126917]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [124337]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [151817]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47686]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [54960]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [131236]
        }
    });
    expect(achievement.data.count).toEqual(8);
});

test('Don\'t Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1]
        }
    });
    expect(achievement.data.count).toEqual(0);
});

test('Duplicates', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [67333]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [67333]
        }
    });
    expect(achievement.data.count).toEqual(2);
});

test('Missing Data', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: undefined
        }
    });
    achievement.evaluate({
        taxon: undefined
    });
    expect(achievement.data.count).toEqual(0);
});
