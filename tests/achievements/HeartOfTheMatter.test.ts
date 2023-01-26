import AchievementWrapper from '../../src/scripts/AchievementWrapper';
import HeartOfTheMatter from '../../src/scripts/achievements/HeartOfTheMatter';

const achievement: AchievementWrapper = HeartOfTheMatter;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        taxon: {
            threatened: true
        }
    });
    expect(achievement.data.count).toEqual(1);
    achievement.reset();
    expect(achievement.data.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        taxon: {
            threatened: true
        }
    });
    expect(achievement.data.count).toEqual(1);
});

test('Don\'t Count', () => {
    achievement.evaluate({
        taxon: {
            threatened: false
        }
    });
    expect(achievement.data.count).toEqual(0);
});

test('Duplicates', () => {
    achievement.evaluate({
        taxon: {
            threatened: true
        }
    });
    achievement.evaluate({
        taxon: {
            threatened: true
        }
    });
    expect(achievement.data.count).toEqual(2);
});

test('Missing Data', () => {
    achievement.evaluate({
        taxon: {
            threatened: undefined
        }
    });
    expect(achievement.data.count).toEqual(0);
});
