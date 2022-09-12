import CatsAndDogs from '../../src/scripts/achievements/CatsAndDogs';

test('reset', () => {
    CatsAndDogs.evaluate({
        taxon: {
            ancestor_ids: [ 1, 2, 3, 41944, 5, 6, 7 ]
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    expect(CatsAndDogs.count).toEqual(0);
    CatsAndDogs.evaluate({
        taxon: {
            ancestor_ids: [ 1, 2, 3, 42043, 5, 6, 7 ]
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    expect(CatsAndDogs.count).toEqual(1);
    CatsAndDogs.reset();
    expect(CatsAndDogs.count).toEqual(0);
});

test('evaluate count', () => {
    CatsAndDogs.reset();
    CatsAndDogs.evaluate({
        taxon: {
            ancestor_ids: [41944]
        },
        observed_on_details: {
            date: '2022-05-05'
        }
    });
    CatsAndDogs.evaluate({
        taxon: {
            ancestor_ids: [42043]
        },
        observed_on_details: {
            date: '2022-05-05'
        }
    });
    CatsAndDogs.evaluate({
        taxon: {
            ancestor_ids: [41944]
        },
        observed_on_details: {
            date: '2022-03-03'
        }
    });
    CatsAndDogs.evaluate({
        taxon: {
            ancestor_ids: [42043]
        },
        observed_on_details: {
            date: '2022-03-03'
        }
    });
    expect(CatsAndDogs.count).toEqual(2);
});

test('evaluate duplicates', () => {
    CatsAndDogs.reset()
    CatsAndDogs.evaluate({
        taxon: {
            ancestor_ids: [41944]
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    CatsAndDogs.evaluate({
        taxon: {
            ancestor_ids: [42043]
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    CatsAndDogs.evaluate({
        taxon: {
            ancestor_ids: [41944]
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    CatsAndDogs.evaluate({
        taxon: {
            ancestor_ids: [42043]
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    expect(CatsAndDogs.count).toEqual(1);
});

test('evaluate gaps', () => {
    CatsAndDogs.reset();
    CatsAndDogs.evaluate({
        taxon: {
            ancestor_ids: [41944]
        },
        observed_on_details: {
            date: '2022-03-03'
        }
    });
    CatsAndDogs.evaluate({
        taxon: {
            ancestor_ids: [42043]
        },
        observed_on_details: {
            date: '2022-03-04'
        }
    });
    expect(CatsAndDogs.count).toEqual(0);
});

test('evaluate missing', () => {
    CatsAndDogs.reset()
    CatsAndDogs.evaluate({
        taxon: {
            ancestor_ids: undefined
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    CatsAndDogs.evaluate({
        taxon: undefined,
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    CatsAndDogs.evaluate({
        taxon: {
            ancestor_ids: [42043]
        },
        observed_on_details: {
            date: undefined
        }
    });
    CatsAndDogs.evaluate({
        taxon: {
            ancestor_ids: [41944]
        },
        observed_on_details: undefined
    });
    expect(CatsAndDogs.count).toEqual(0);
});
