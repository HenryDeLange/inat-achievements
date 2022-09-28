import AchievementData from '../../src/scripts/AchievementData';
import ToadsAndToadstools from '../../src/scripts/achievements/ToadsAndToadstools';

const achievement: AchievementData = ToadsAndToadstools;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 20979, 5, 6, 7]
        }
    });
    expect(achievement.count).toEqual(1);
    achievement.reset();
    expect(achievement.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [20979]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47169]
        }
    });
    expect(achievement.count).toEqual(2);
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
            ancestor_ids: [47169]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47169]
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
