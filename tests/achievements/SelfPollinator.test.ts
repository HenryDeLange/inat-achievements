import AchievementWrapper from '../../src/scripts/AchievementWrapper';
import SelfPollinator from '../../src/scripts/achievements/SelfPollinator';

const achievement: AchievementWrapper = SelfPollinator;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        comments: [{
            user: {
                id: 1
            }
        }],
        user: {
            id: 1
        }
    });
    expect(achievement.data.count).toEqual(1);
    achievement.reset();
    expect(achievement.data.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        comments: [{
            user: {
                id: 1
            }
        }],
        user: {
            id: 1
        }
    });
    expect(achievement.data.count).toEqual(1);
});

test('Don\'t Count', () => {
    achievement.evaluate({
        comments: [{
            user: {
                id: 1
            }
        }],
        user: {
            id: 2
        }
    });
    expect(achievement.data.count).toEqual(0);
    achievement.evaluate({
        user: {
            id: 1
        }
    });
    expect(achievement.data.count).toEqual(0);
});

test('Duplicates', () => {
    achievement.evaluate({
        comments: [{
            user: {
                id: 1
            }
        }],
        user: {
            id: 1
        }
    });
    achievement.evaluate({
        comments: [{
            user: {
                id: 1
            }
        }],
        user: {
            id: 1
        }
    });
    expect(achievement.data.count).toEqual(2);
});

test('Gaps', () => {
    achievement.evaluate({
        comments: [{
            user: {
                id: 11
            }
        }, {
            user: {
                id: 2
            }
        }, {
            user: {
                id: 33
            }
        }],
        user: {
            id: 2
        }
    });
    expect(achievement.data.count).toEqual(1);
});

test('Missing Data', () => {
    achievement.evaluate({
        comments: [{
            user: {
                id: undefined
            }
        }],
        user: {
            id: undefined
        }
    });
    achievement.evaluate({
        comments: [{
            user: undefined
        }],
        user: undefined
    });
    achievement.evaluate({
        comments: undefined
    });
    expect(achievement.data.count).toEqual(0);
});
