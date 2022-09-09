import AlwaysOn from '../../src/scripts/achievements/AlwaysOn';

test('reset', () => {
    AlwaysOn.evaluate({
        observed_on_details: {
            date: '2022-02-02'
        }
    });
    expect(AlwaysOn.count).toEqual(1);
    AlwaysOn.reset();
    expect(AlwaysOn.count).toEqual(0);
});

test('evaluate count', () => {
    AlwaysOn.reset();
    AlwaysOn.evaluate({
        observed_on_details: {
            date: '2022-01-05'
        }
    });
    expect(AlwaysOn.count).toEqual(1);
    AlwaysOn.evaluate({
        observed_on_details: {
            date: '2022-01-04'
        }
    });
    AlwaysOn.evaluate({
        observed_on_details: {
            date: '2022-01-02'
        }
    });
    AlwaysOn.evaluate({
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    expect(AlwaysOn.count).toEqual(4);
});

test('evaluate duplicates', () => {
    AlwaysOn.reset();
    AlwaysOn.evaluate({
        observed_on_details: {
            date: '2022-02-02'
        }
    });
    AlwaysOn.evaluate({
        observed_on_details: {
            date: '2022-02-02'
        }
    });
    expect(AlwaysOn.count).toEqual(1);
});

test('evaluate gaps', () => {
    AlwaysOn.reset();
    AlwaysOn.evaluate({
        observed_on_details: {
            date: '2022-08-04'
        }
    });
    AlwaysOn.evaluate({
        observed_on_details: {
            date: '2022-08-01'
        }
    });
    expect(AlwaysOn.count).toEqual(2);
    AlwaysOn.evaluate({
        observed_on_details: {
            date: '2022-07-14'
        }
    });
    AlwaysOn.evaluate({
        observed_on_details: {
            date: '2022-07-10' // 5 days period, inclusive (14, 13, 12, 11, 10)
        }
    });
    AlwaysOn.evaluate({
        observed_on_details: {
            date: '2022-07-08'
        }
    });
    AlwaysOn.evaluate({
        observed_on_details: {
            date: '2022-07-03'
        }
    });
    expect(AlwaysOn.count).toEqual(3);
    AlwaysOn.evaluate({
        observed_on_details: {
            date: '2022-06-04'
        }
    });
    AlwaysOn.evaluate({
        observed_on_details: {
            date: '2022-06-01'
        }
    });
    expect(AlwaysOn.count).toEqual(3);
});

test('evaluate missing', () => {
    AlwaysOn.reset();
    AlwaysOn.evaluate({
        observed_on_details: {
            date: undefined
        }
    });
    AlwaysOn.evaluate({
        observed_on_details: undefined
    });
    expect(AlwaysOn.count).toEqual(0);
});
