import AllCorners from '../../src/scripts/achievements/AllCorners';

test('reset', () => {
    AllCorners.evaluate({
        geojson: {
            coordinates: [ '1', '1' ]
        }
    });
    expect(AllCorners.count).toEqual(1);
    AllCorners.reset();
    expect(AllCorners.count).toEqual(0);
});

test('evaluate count', () => {
    AllCorners.reset();
    AllCorners.evaluate({
        geojson: {
            coordinates: [ '1', '1' ]
        }
    });
    AllCorners.evaluate({
        geojson: {
            coordinates: [ '-1', '-1' ]
        }
    });
    AllCorners.evaluate({
        geojson: {
            coordinates: [ '-1', '1' ]
        }
    });
    AllCorners.evaluate({
        geojson: {
            coordinates: [ '1', '-1' ]
        }
    });
    expect(AllCorners.count).toEqual(4);
});

test('evaluate duplicates', () => {
    AllCorners.reset();
    AllCorners.evaluate({
        geojson: {
            coordinates: [ '1', '1' ]
        }
    });
    AllCorners.evaluate({
        geojson: {
            coordinates: [ '1', '1' ]
        }
    });
    expect(AllCorners.count).toEqual(1);
});

test('evaluate missing', () => {
    AllCorners.reset();
    AllCorners.evaluate({
        geojson: undefined
    });
    expect(AllCorners.count).toEqual(0);
});
