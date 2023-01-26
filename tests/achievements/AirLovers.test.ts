import AchievementWrapper from '../../src/scripts/AchievementWrapper';
import AirLovers from '../../src/scripts/achievements/AirLovers';

const achievement: AchievementWrapper = AirLovers;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 6544, 5, 6, 7]
        }
    });
    expect(achievement.data.count).toEqual(1);
    achievement.reset();
    expect(achievement.data.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [6544]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [11853]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [559244]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [5362]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [5425]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [5391]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [5400]
        }
    });
    expect(achievement.data.count).toEqual(7);
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
            ancestor_ids: [5400]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [5400]
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
