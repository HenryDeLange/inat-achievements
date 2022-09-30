import AchievementData from '../../src/scripts/AchievementData';
import RatKing from '../../src/scripts/achievements/RatKing';

const achievement: AchievementData = RatKing;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 43698, 5, 6, 7]
        }
    });
    expect(achievement.count).toEqual(1);
    achievement.reset();
    expect(achievement.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [43698]
        }
    });
    expect(achievement.count).toEqual(1);
});

test('Don\'t Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1]
        }
    });
    expect(achievement.count).toEqual(0);
});

test('Duplicates', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [43698]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [43698]
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
