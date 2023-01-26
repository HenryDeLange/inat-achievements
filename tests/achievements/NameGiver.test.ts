import AchievementWrapper from '../../src/scripts/AchievementWrapper';
import NameGiver from '../../src/scripts/achievements/NameGiver';

const achievement: AchievementWrapper = NameGiver;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        user: {
            identifications_count: 1
        }
    });
    expect(achievement.data.count).toEqual(1);
    achievement.reset();
    expect(achievement.data.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        user: {
            identifications_count: 5
        }
    });
    expect(achievement.data.count).toEqual(5);
});

test('Don\'t Count', () => {
    achievement.evaluate({
        user: {
            identifications_count: 0
        }
    });
    expect(achievement.data.count).toEqual(0);
});

test('Missing Data', () => {
    achievement.evaluate({
        user: {
            identifications_count: undefined
        }
    });
    achievement.evaluate({
        user: undefined
    });
    expect(achievement.data.count).toEqual(0);
});
