import AchievementData from '../../src/scripts/AchievementData';
import CatchOfTheDay from '../../src/scripts/achievements/CatchOfTheDay';

const achievement: AchievementData = CatchOfTheDay;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [ 1, 2, 3, 47178, 5, 6, 7 ]
        },
        observed_on_details: {
            date: '2022-02-02'
        }
    });
    expect(achievement.count).toEqual(1);
    achievement.reset();
    expect(achievement.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [85497]
        },
        observed_on_details: {
            date: '2022-02-09'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47178]
        },
        observed_on_details: {
            date: '2022-02-08'
        }
    });
    expect(achievement.count).toEqual(2);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [85497]
        },
        observed_on_details: {
            date: '2022-02-07'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47178]
        },
        observed_on_details: {
            date: '2022-02-06'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [85497]
        },
        observed_on_details: {
            date: '2022-02-05'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47178]
        },
        observed_on_details: {
            date: '2022-02-04'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47178]
        },
        observed_on_details: {
            date: '2022-02-03'
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
            date: '2022-02-09'
        }
    });
    expect(achievement.count).toEqual(0);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [85497]
        },
        observed_on_details: {
            date: '2022-07-07'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47178]
        },
        observed_on_details: {
            date: '2022-06-06'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [85497]
        },
        observed_on_details: {
            date: '2022-05-05'
        }
    });
    expect(achievement.count).toEqual(1);
});

test('Duplicates', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [85497]
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47178]
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    expect(achievement.count).toEqual(1);
});

test('Gaps', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [85497]
        },
        observed_on_details: {
            date: '2022-08-01'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47178]
        },
        observed_on_details: {
            date: '2022-05-13'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [85497]
        },
        observed_on_details: {
            date: '2022-05-12'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47178]
        },
        observed_on_details: {
            date: '2022-05-11'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [85497]
        },
        observed_on_details: {
            date: '2022-04-22'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47178]
        },
        observed_on_details: {
            date: '2022-04-21'
        }
    });
    expect(achievement.count).toEqual(3);
});

test('Missing Data', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: undefined
        },
        observed_on_details: {
            date: '2022-04-21'
        }
    });
    achievement.evaluate({
        taxon: undefined,
        observed_on_details: {
            date: '2022-04-21'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47178]
        },
        observed_on_details: {
            date: undefined
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47178]
        },
        observed_on_details: undefined
    });
    expect(achievement.count).toEqual(0);
});
