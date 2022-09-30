import AchievementData from '../../src/scripts/AchievementData';
import KingFisher from '../../src/scripts/achievements/KingFisher';

const achievement: AchievementData = KingFisher;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 47178, 5, 6, 7]
        }
    });
    expect(achievement.count).toEqual(1);
    achievement.reset();
    expect(achievement.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47178]
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
            ancestor_ids: [47178]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47178]
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
