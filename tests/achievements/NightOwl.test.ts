import AchievementWrapper from '../../src/scripts/AchievementWrapper';
import NightOwl from '../../src/scripts/achievements/NightOwl';

const achievement: AchievementWrapper = NightOwl;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 19350, 5, 6, 7]
        },
        observed_on_details: {
            hour: 5
        }
    });
    expect(achievement.data.count).toEqual(1);
    achievement.reset();
    expect(achievement.data.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [19350]
        },
        observed_on_details: {
            hour: 4
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [19664]
        },
        observed_on_details: {
            hour: 0
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [19376]
        },
        observed_on_details: {
            hour: 20
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [19351]
        },
        observed_on_details: {
            hour: 24
        }
    });
    expect(achievement.data.count).toEqual(4);
});

test('Don\'t Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1]
        },
        observed_on_details: {
            hour: 5
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [19350]
        },
        observed_on_details: {
            hour: 7
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [19350]
        },
        observed_on_details: {
            hour: 17
        }
    });
    expect(achievement.data.count).toEqual(0);
});

test('Duplicates', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [19350]
        },
        observed_on_details: {
            hour: 5
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [19350]
        },
        observed_on_details: {
            hour: 5
        }
    });
    expect(achievement.data.count).toEqual(2);
});

test('Gaps', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [19350]
        },
        observed_on_details: {
            hour: 3
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [19350]
        },
        observed_on_details: {
            hour: 6
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [19350]
        },
        observed_on_details: {
            hour: 8
        }
    });
    expect(achievement.data.count).toEqual(2);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [19350]
        },
        observed_on_details: {
            hour: 16
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [19350]
        },
        observed_on_details: {
            hour: 18
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [19350]
        },
        observed_on_details: {
            hour: 20
        }
    });
    expect(achievement.data.count).toEqual(4);
});

test('Missing Data', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: undefined
        },
        observed_on_details: {
            hour: undefined
        }
    });
    achievement.evaluate({
        taxon: undefined,
        observed_on_details: undefined
    });
    expect(achievement.data.count).toEqual(0);
});
