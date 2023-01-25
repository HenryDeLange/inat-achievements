import AchievementWrapper from '../../src/scripts/AchievementWrapper';
import EarlyBird from '../../src/scripts/achievements/EarlyBird';

const achievement: AchievementWrapper = EarlyBird;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [11, 22, 33, 3, 55, 66, 77]
        },
        observed_on_details: {
            date: '2022-01-01',
            hour: 7
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [11, 22, 33, 47491, 55, 66, 77]
        },
        observed_on_details: {
            date: '2022-01-01',
            hour: 7
        }
    });
    expect(achievement.data.count).toEqual(1);
    achievement.reset();
    expect(achievement.data.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [3]
        },
        observed_on_details: {
            date: '2022-01-02',
            hour: 7
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47491]
        },
        observed_on_details: {
            date: '2022-01-02',
            hour: 7
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [3]
        },
        observed_on_details: {
            date: '2022-01-01',
            hour: 7
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47491]
        },
        observed_on_details: {
            date: '2022-01-01',
            hour: 7
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1]
        },
        observed_on_details: {
            date: '2022-01-01',
            hour: 7
        }
    });
    expect(achievement.data.count).toEqual(2);
});

test('Don\'t Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1]
        },
        observed_on_details: {
            date: '2022-05-02',
            hour: 7
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [2]
        },
        observed_on_details: {
            date: '2022-05-02',
            hour: 7
        }
    });
    expect(achievement.data.count).toEqual(0);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [3]
        },
        observed_on_details: {
            date: '2022-04-01',
            hour: 8
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47491]
        },
        observed_on_details: {
            date: '2022-04-01',
            hour: 8
        }
    });
    expect(achievement.data.count).toEqual(0);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [3]
        },
        observed_on_details: {
            date: '2022-03-02',
            hour: 7
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47491]
        },
        observed_on_details: {
            date: '2022-03-01',
            hour: 7
        }
    });
    expect(achievement.data.count).toEqual(0);
});

test('Duplicates', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [3]
        },
        observed_on_details: {
            date: '2022-01-01',
            hour: 7
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47491]
        },
        observed_on_details: {
            date: '2022-01-01',
            hour: 7
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [3]
        },
        observed_on_details: {
            date: '2022-01-01',
            hour: 7
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47491]
        },
        observed_on_details: {
            date: '2022-01-01',
            hour: 7
        }
    });
    expect(achievement.data.count).toEqual(1);
});

test('Gaps', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [3]
        },
        observed_on_details: {
            date: '2022-01-02',
            hour: 5
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47491]
        },
        observed_on_details: {
            date: '2022-01-02',
            hour: 2
        }
    });
    expect(achievement.data.count).toEqual(1);
});

test('Missing Data', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: undefined
        },
        observed_on_details: {
            date: undefined,
            hour: undefined
        }
    });
    achievement.evaluate({
        taxon: undefined,
        observed_on_details: undefined
    });
    expect(achievement.data.count).toEqual(0);
});
