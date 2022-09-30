import AchievementData from '../../src/scripts/AchievementData';
import LichenMoss from '../../src/scripts/achievements/LichenMoss';

const achievement: AchievementData = LichenMoss;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 311249, 5, 6, 7]
        }
    });
    expect(achievement.count).toEqual(1);
    achievement.reset();
    expect(achievement.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [311249]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [54743]
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
            ancestor_ids: [311249]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [54743]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [311249]
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [54743]
        }
    });
    expect(achievement.count).toEqual(4);
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
