import AchievementData from '../../src/scripts/AchievementData';
import Strider from '../../src/scripts/achievements/Strider';

const achievement: AchievementData = Strider;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        geojson: {
            coordinates: ['1', '1']
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    achievement.evaluate({
        geojson: {
            coordinates: ['2', '2']
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    expect(achievement.count).toEqual(157);
    achievement.reset();
    expect(achievement.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        geojson: {
            coordinates: ['1', '1']
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    achievement.evaluate({
        geojson: {
            coordinates: ['2', '2']
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    expect(achievement.count).toEqual(157);
});

test('Don\'t Count', () => {
    achievement.evaluate({
        geojson: {
            coordinates: ['1', '1']
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    achievement.evaluate({
        geojson: {
            coordinates: ['2', '2']
        },
        observed_on_details: {
            date: '2022-01-02'
        }
    });
    expect(achievement.count).toEqual(0);
});

test('Duplicates', () => {
    achievement.evaluate({
        geojson: {
            coordinates: ['1', '1']
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    achievement.evaluate({
        geojson: {
            coordinates: ['1', '1']
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    expect(achievement.count).toEqual(0);
    achievement.evaluate({
        geojson: {
            coordinates: ['2', '2']
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    achievement.evaluate({
        geojson: {
            coordinates: ['2', '2']
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    expect(achievement.count).toEqual(157);
});

test('Gaps', () => {
    achievement.evaluate({
        geojson: {
            coordinates: ['-20', '-20']
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    achievement.evaluate({
        geojson: {
            coordinates: ['20', '20']
        },
        observed_on_details: {
            date: '2022-01-01'
        }
    });
    expect(achievement.count).toEqual(6225);
});

test('Missing Data', () => {
    achievement.evaluate({
        geojson: {
            coordinates: undefined
        },
        observed_on_details: {
            date: undefined
        }
    });
    achievement.evaluate({
        geojson: undefined,
        observed_on_details: undefined
    });
    expect(achievement.count).toEqual(0);
});
