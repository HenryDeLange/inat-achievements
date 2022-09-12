import DaisyTown from '../../src/scripts/achievements/DaisyTown';

test('reset', () => {
    DaisyTown.evaluate({
        taxon: {
            ancestor_ids: [ 1, 2, 3, 47604, 5, 6, 7 ]
        }
    });
    expect(DaisyTown.count).toEqual(1);
    DaisyTown.reset();
    expect(DaisyTown.count).toEqual(0);
});

test('evaluate count', () => {
    DaisyTown.reset();
    DaisyTown.evaluate({
        taxon: {
            ancestor_ids: [47604]
        }
    });
    DaisyTown.evaluate({
        taxon: {
            ancestor_ids: [1]
        }
    });
    expect(DaisyTown.count).toEqual(1);
});

test('evaluate duplicates', () => {
    DaisyTown.reset()
    DaisyTown.evaluate({
        taxon: {
            ancestor_ids: [47604]
        }
    });
    DaisyTown.evaluate({
        taxon: {
            ancestor_ids: [47604]
        }
    });
    expect(DaisyTown.count).toEqual(2);
});

test('evaluate missing', () => {
    DaisyTown.reset()
    DaisyTown.evaluate({
        taxon: {
            ancestor_ids: undefined
        }
    });
    DaisyTown.evaluate({
        taxon: undefined
    });
    expect(DaisyTown.count).toEqual(0);
});
