import AllCorners from '../../src/scripts/achievements/AllCorners';

test('count all corners', () => {
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

test('reset the count', () => {
    AllCorners.evaluate({
        geojson: {
            coordinates: [ '1', '1' ]
        }
    });
    expect(AllCorners.count).toEqual(4);
    AllCorners.reset();
    expect(AllCorners.count).toEqual(0);
});
