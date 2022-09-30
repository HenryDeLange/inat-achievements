import AchievementData from '../../src/scripts/AchievementData';
import TryMammals from '../../src/scripts/achievements/TryMammals';

const achievement: AchievementData = TryMammals;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 42478, 5, 6, 7]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 152871, 5, 6, 7]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 40268, 5, 6, 7]
        }
    });
    expect(achievement.count).toEqual(1);
    achievement.reset();
    expect(achievement.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [42478]
        }
    });
    expect(achievement.count).toEqual(0);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [152871]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [40268]
        }
    });
    expect(achievement.count).toEqual(1);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [43253]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [46306]
        }
    });
    expect(achievement.count).toEqual(1);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [40268]
        }
    });
    expect(achievement.count).toEqual(2);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [46927]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [526556]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [40268]
        }
    });
    expect(achievement.count).toEqual(3);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [71384]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [152871]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [40268]
        }
    });
    expect(achievement.count).toEqual(4);
});

test('Don\'t Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1]
        }
    });
    expect(achievement.count).toEqual(0);
    achievement.reset();
    achievement.evaluate({
        taxon: {
            ancestor_ids: [42478]
        }
    });
    expect(achievement.count).toEqual(0);
    achievement.reset();
    achievement.evaluate({
        taxon: {
            ancestor_ids: [152871]
        }
    });
    expect(achievement.count).toEqual(0);
    achievement.reset();
    achievement.evaluate({
        taxon: {
            ancestor_ids: [40268]
        }
    });
    expect(achievement.count).toEqual(0);
});

test('Duplicates', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [42478]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [152871]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [40268]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [42478]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [152871]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [40268]
        }
    });
    expect(achievement.count).toEqual(2);
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
    expect(achievement.count).toEqual(0);
});
