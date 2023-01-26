import AchievementWrapper from '../../src/scripts/AchievementWrapper';
import SocialButterfly from '../../src/scripts/achievements/SocialButterfly';

const achievement: AchievementWrapper = SocialButterfly;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 47224, 5, 6, 7]
        },
        comments_count: 1
    });
    expect(achievement.data.count).toEqual(1);
    achievement.reset();
    expect(achievement.data.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47224]
        },
        comments_count: 1
    });
    expect(achievement.data.count).toEqual(1);
});

test('Don\'t Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1]
        },
        comments_count: 1
    });
    expect(achievement.data.count).toEqual(0);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47224]
        },
        comments_count: 0
    });
    expect(achievement.data.count).toEqual(0);
});

test('Duplicates', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47224]
        },
        comments_count: 1
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47224]
        },
        comments_count: 1
    });
    expect(achievement.data.count).toEqual(2);
});

test('Missing Data', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: undefined
        },
        comments_count: undefined
    });
    achievement.evaluate({
        taxon: undefined,
        comments_count: undefined
    });
    expect(achievement.data.count).toEqual(0);
});
