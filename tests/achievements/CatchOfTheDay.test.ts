import CatchOfTheDay from '../../src/scripts/achievements/CatchOfTheDay';

test('reset', () => {
    CatchOfTheDay.evaluate({
        taxon: {
            ancestor_ids: [ 1, 2, 3, 47178, 5, 6, 7 ]
        },
        observed_on_details: {
            date: '2022-02-02'
        }
    });
    expect(CatchOfTheDay.count).toEqual(1);
    CatchOfTheDay.reset();
    expect(CatchOfTheDay.count).toEqual(0);
});

test('evaluate count', () => {
    CatchOfTheDay.reset();
    CatchOfTheDay.evaluate({
        taxon: {
            ancestor_ids: [85497]
        },
        observed_on_details: {
            date: '2022-02-09'
        }
    });
    CatchOfTheDay.evaluate({
        taxon: {
            ancestor_ids: [47178]
        },
        observed_on_details: {
            date: '2022-02-08'
        }
    });
    expect(CatchOfTheDay.count).toEqual(2);
    CatchOfTheDay.evaluate({
        taxon: {
            ancestor_ids: [85497]
        },
        observed_on_details: {
            date: '2022-02-07'
        }
    });
    CatchOfTheDay.evaluate({
        taxon: {
            ancestor_ids: [47178]
        },
        observed_on_details: {
            date: '2022-02-06'
        }
    });
    CatchOfTheDay.evaluate({
        taxon: {
            ancestor_ids: [85497]
        },
        observed_on_details: {
            date: '2022-02-05'
        }
    });
    CatchOfTheDay.evaluate({
        taxon: {
            ancestor_ids: [47178]
        },
        observed_on_details: {
            date: '2022-02-04'
        }
    });
    CatchOfTheDay.evaluate({
        taxon: {
            ancestor_ids: [47178]
        },
        observed_on_details: {
            date: '2022-02-03'
        }
    });
    expect(CatchOfTheDay.count).toEqual(7);
});

test('evaluate duplicates', () => {
    CatchOfTheDay.reset()
    CatchOfTheDay.evaluate({
        taxon: {
            ancestor_ids: [85497]
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    CatchOfTheDay.evaluate({
        taxon: {
            ancestor_ids: [47178]
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    expect(CatchOfTheDay.count).toEqual(1);
});

test('evaluate gaps', () => {
    CatchOfTheDay.reset();
    CatchOfTheDay.evaluate({
        taxon: {
            ancestor_ids: [85497]
        },
        observed_on_details: {
            date: '2022-08-01'
        }
    });
    CatchOfTheDay.evaluate({
        taxon: {
            ancestor_ids: [47178]
        },
        observed_on_details: {
            date: '2022-05-13'
        }
    });
    CatchOfTheDay.evaluate({
        taxon: {
            ancestor_ids: [85497]
        },
        observed_on_details: {
            date: '2022-05-12'
        }
    });
    CatchOfTheDay.evaluate({
        taxon: {
            ancestor_ids: [47178]
        },
        observed_on_details: {
            date: '2022-05-11'
        }
    });
    CatchOfTheDay.evaluate({
        taxon: {
            ancestor_ids: [85497]
        },
        observed_on_details: {
            date: '2022-04-22'
        }
    });
    CatchOfTheDay.evaluate({
        taxon: {
            ancestor_ids: [47178]
        },
        observed_on_details: {
            date: '2022-04-21'
        }
    });
    expect(CatchOfTheDay.count).toEqual(3);
});

test('evaluate missing', () => {
    CatchOfTheDay.reset()
    CatchOfTheDay.evaluate({
        taxon: {
            ancestor_ids: undefined
        },
        observed_on_details: {
            date: '2022-04-21'
        }
    });
    CatchOfTheDay.evaluate({
        taxon: undefined,
        observed_on_details: {
            date: '2022-04-21'
        }
    });
    CatchOfTheDay.evaluate({
        taxon: {
            ancestor_ids: [47178]
        },
        observed_on_details: {
            date: undefined
        }
    });
    CatchOfTheDay.evaluate({
        taxon: {
            ancestor_ids: [47178]
        },
        observed_on_details: undefined
    });
    expect(CatchOfTheDay.count).toEqual(0);
});
