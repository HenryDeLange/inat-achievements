import AchievementWrapper from '../../src/scripts/AchievementWrapper';
import CraneyStorker from '../../src/scripts/achievements/CraneyStorker';

const achievement: AchievementWrapper = CraneyStorker;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [ 1, 2, 3, 3726, 5, 6, 7 ]
        }
    });
    expect(achievement.data.count).toEqual(1);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [ 1, 2, 3, 23, 5, 6, 7 ]
        }
    });
    expect(achievement.data.count).toEqual(2);
    achievement.reset();
    expect(achievement.data.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [3726]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [23]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [4929]
        }
    });
    expect(achievement.data.count).toEqual(3);
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
            ancestor_ids: [3726]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [3726]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [23]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [23]
        }
    });
    expect(achievement.data.count).toEqual(4);
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
