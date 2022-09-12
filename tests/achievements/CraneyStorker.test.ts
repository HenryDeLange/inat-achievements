import CraneyStorker from '../../src/scripts/achievements/CraneyStorker';

test('reset', () => {
    CraneyStorker.evaluate({
        taxon: {
            ancestor_ids: [ 1, 2, 3, 3726, 5, 6, 7 ]
        }
    });
    expect(CraneyStorker.count).toEqual(1);
    CraneyStorker.evaluate({
        taxon: {
            ancestor_ids: [ 1, 2, 3, 23, 5, 6, 7 ]
        }
    });
    expect(CraneyStorker.count).toEqual(2);
    CraneyStorker.reset();
    expect(CraneyStorker.count).toEqual(0);
});

test('evaluate count', () => {
    CraneyStorker.reset();
    CraneyStorker.evaluate({
        taxon: {
            ancestor_ids: [3726]
        }
    });
    CraneyStorker.evaluate({
        taxon: {
            ancestor_ids: [23]
        }
    });
    CraneyStorker.evaluate({
        taxon: {
            ancestor_ids: [1]
        }
    });
    expect(CraneyStorker.count).toEqual(2);
});

test('evaluate duplicates', () => {
    CraneyStorker.reset()
    CraneyStorker.evaluate({
        taxon: {
            ancestor_ids: [3726]
        }
    });
    CraneyStorker.evaluate({
        taxon: {
            ancestor_ids: [3726]
        }
    });
    CraneyStorker.evaluate({
        taxon: {
            ancestor_ids: [23]
        }
    });
    CraneyStorker.evaluate({
        taxon: {
            ancestor_ids: [23]
        }
    });
    expect(CraneyStorker.count).toEqual(4);
});

test('evaluate missing', () => {
    CraneyStorker.reset()
    CraneyStorker.evaluate({
        taxon: {
            ancestor_ids: undefined
        }
    });
    CraneyStorker.evaluate({
        taxon: undefined
    });
    expect(CraneyStorker.count).toEqual(0);
});
