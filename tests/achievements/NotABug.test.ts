import AchievementData from '../../src/scripts/AchievementData';
import NotABug from '../../src/scripts/achievements/NotABug';

const achievement: AchievementData = NotABug;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 47158, 5, 6, 7]
        }
    });
    expect(achievement.count).toEqual(1);
    achievement.reset();
    expect(achievement.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47158]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [144128]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47119]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [243773]
        }
    });
    expect(achievement.count).toEqual(4);
});

test('Don\'t Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1]
        }
    });
    expect(achievement.count).toEqual(0);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47158, 61267]
        }
    });
    expect(achievement.count).toEqual(0);
});

test('Duplicates', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [243773]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [243773]
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
