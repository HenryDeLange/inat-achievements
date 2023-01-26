import AchievementWrapper from '../../src/scripts/AchievementWrapper';
import DaisyTown from '../../src/scripts/achievements/DaisyTown';

const achievement: AchievementWrapper = DaisyTown;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [ 1, 2, 3, 47604, 5, 6, 7 ]
        }
    });
    expect(achievement.data.count).toEqual(1);
    achievement.reset();
    expect(achievement.data.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47604]
        }
    });
    expect(achievement.data.count).toEqual(1);
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
            ancestor_ids: [47604]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47604]
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
