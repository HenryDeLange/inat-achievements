import AchievementWrapper from '../../src/scripts/AchievementWrapper';
import CatsAndDogs from '../../src/scripts/achievements/CatsAndDogs';

const achievement: AchievementWrapper = CatsAndDogs;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [ 1, 2, 3, 41944, 5, 6, 7 ]
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    expect(achievement.data.count).toEqual(0);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [ 1, 2, 3, 42043, 5, 6, 7 ]
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    expect(achievement.data.count).toEqual(1);
    achievement.reset();
    expect(achievement.data.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [41944]
        },
        observed_on_details: {
            date: '2022-05-05'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [42043]
        },
        observed_on_details: {
            date: '2022-05-05'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [41944]
        },
        observed_on_details: {
            date: '2022-03-03'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [42043]
        },
        observed_on_details: {
            date: '2022-03-03'
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
            date: '2022-05-05'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [2]
        },
        observed_on_details: {
            date: '2022-05-05'
        }
    });
    expect(achievement.data.count).toEqual(0);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [41944]
        },
        observed_on_details: {
            date: '2022-03-03'
        }
    });
    expect(achievement.data.count).toEqual(0);
    achievement.reset();
    achievement.evaluate({
        taxon: {
            ancestor_ids: [42043]
        },
        observed_on_details: {
            date: '2022-04-04'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1]
        },
        observed_on_details: {
            date: '2022-04-04'
        }
    });
    expect(achievement.data.count).toEqual(0);
});

test('Duplicates', () => {
    
    achievement.evaluate({
        taxon: {
            ancestor_ids: [41944]
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [42043]
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [41944]
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [42043]
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    expect(achievement.data.count).toEqual(1);
});

test('Gaps', () => {
    achievement.reset();
    achievement.evaluate({
        taxon: {
            ancestor_ids: [41944]
        },
        observed_on_details: {
            date: '2022-03-03'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [42043]
        },
        observed_on_details: {
            date: '2022-03-04'
        }
    });
    expect(achievement.data.count).toEqual(0);
});

test('Missing Data', () => {
    achievement.reset()
    achievement.evaluate({
        taxon: {
            ancestor_ids: undefined
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    achievement.evaluate({
        taxon: undefined,
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [42043]
        },
        observed_on_details: {
            date: undefined
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [41944]
        },
        observed_on_details: undefined
    });
    expect(achievement.data.count).toEqual(0);
});
