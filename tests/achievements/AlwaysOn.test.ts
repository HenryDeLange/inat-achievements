import AchievementData from '../../src/scripts/AchievementData';
import AlwaysOn from '../../src/scripts/achievements/AlwaysOn';

const achievement: AchievementData = AlwaysOn;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        observed_on_details: {
            date: '2022-02-02'
        }
    });
    expect(achievement.count).toEqual(1);
    achievement.reset();
    expect(achievement.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        observed_on_details: {
            date: '2022-01-05'
        }
    });
    expect(achievement.count).toEqual(1);
    achievement.evaluate({
        observed_on_details: {
            date: '2022-01-04'
        }
    });
    achievement.evaluate({
        observed_on_details: {
            date: '2022-01-02'
        }
    });
    achievement.evaluate({
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    expect(achievement.count).toEqual(4);
});

test('Don\'t Count', () => {
    achievement.evaluate({
        observed_on_details: {
            date: undefined
        }
    });
    expect(achievement.count).toEqual(0);
});

test('Duplicates', () => {
    achievement.evaluate({
        observed_on_details: {
            date: '2022-02-02'
        }
    });
    achievement.evaluate({
        observed_on_details: {
            date: '2022-02-02'
        }
    });
    expect(achievement.count).toEqual(1);
});

test('Gaps', () => {
    achievement.evaluate({
        observed_on_details: {
            date: '2022-08-04'
        }
    });
    achievement.evaluate({
        observed_on_details: {
            date: '2022-08-01'
        }
    });
    expect(achievement.count).toEqual(2);
    achievement.evaluate({
        observed_on_details: {
            date: '2022-07-14'
        }
    });
    achievement.evaluate({
        observed_on_details: {
            date: '2022-07-10' // 5 days period, inclusive (14, 13, 12, 11, 10)
        }
    });
    achievement.evaluate({
        observed_on_details: {
            date: '2022-07-08'
        }
    });
    achievement.evaluate({
        observed_on_details: {
            date: '2022-07-03'
        }
    });
    expect(achievement.count).toEqual(3);
    achievement.evaluate({
        observed_on_details: {
            date: '2022-06-04'
        }
    });
    achievement.evaluate({
        observed_on_details: {
            date: '2022-06-01'
        }
    });
    expect(achievement.count).toEqual(3);
});

test('Missing Data', () => {
    achievement.evaluate({
        observed_on_details: {
            date: undefined
        }
    });
    achievement.evaluate({
        observed_on_details: undefined
    });
    expect(achievement.count).toEqual(0);
});
