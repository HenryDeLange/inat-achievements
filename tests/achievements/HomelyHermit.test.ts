import AchievementData from '../../src/scripts/AchievementData';
import HomelyHermit from '../../src/scripts/achievements/HomelyHermit';

const achievement: AchievementData = HomelyHermit;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 47398, 5, 6, 7]
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    expect(achievement.count).toEqual(1);
    achievement.reset();
    expect(achievement.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47398]
        },
        observed_on_details: {
            date: '2022-01-08'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47398]
        },
        observed_on_details: {
            date: '2022-01-07'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47398]
        },
        observed_on_details: {
            date: '2022-01-06'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47398]
        },
        observed_on_details: {
            date: '2022-01-05'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47398]
        },
        observed_on_details: {
            date: '2022-01-04'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [39532]
        },
        observed_on_details: {
            date: '2022-01-03'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47114]
        },
        observed_on_details: {
            date: '2022-01-02'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [61415]
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    expect(achievement.count).toEqual(7);
});

test('Don\'t Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1]
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    expect(achievement.count).toEqual(0);
});

test('Duplicates', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47398]
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47398]
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [39532]
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    expect(achievement.count).toEqual(3);
});

test('Gaps', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47398]
        },
        observed_on_details: {
            date: '2022-01-09'
        }
    });
    // Skip '2022-01-08'
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47398]
        },
        observed_on_details: {
            date: '2022-01-07'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47398]
        },
        observed_on_details: {
            date: '2022-01-06'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47398]
        },
        observed_on_details: {
            date: '2022-01-05'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47398]
        },
        observed_on_details: {
            date: '2022-01-04'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47398]
        },
        observed_on_details: {
            date: '2022-01-03'
        }
    });
    expect(achievement.count).toEqual(6);
    // Skip '2022-01-02'
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47398]
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    expect(achievement.count).toEqual(6);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47398]
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47398]
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    expect(achievement.count).toEqual(8);
});

test('Missing Data', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: undefined
        },
        observed_on_details: {
            date: undefined
        }
    });
    achievement.evaluate({
        taxon: undefined,
        observed_on_details: undefined
    });
    expect(achievement.count).toEqual(0);
});
