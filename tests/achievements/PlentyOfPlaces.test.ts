import AchievementData from '../../src/scripts/AchievementData';
import PlentyOfPlaces from '../../src/scripts/achievements/PlentyOfPlaces';

const achievement: AchievementData = PlentyOfPlaces;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        geojson: {
            coordinates: ['1', '1']
        }
    });
    expect(achievement.count).toEqual(1);
    achievement.reset();
    expect(achievement.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        geojson: {
            coordinates: ['1.1', '1.1']
        }
    });
    expect(achievement.count).toEqual(1);
    achievement.evaluate({
        geojson: {
            coordinates: ['1.5', '1.5']
        }
    });
    expect(achievement.count).toEqual(2);
});

test('Duplicates', () => {
    achievement.evaluate({
        geojson: {
            coordinates: ['1', '1']
        }
    });
    achievement.evaluate({
        geojson: {
            coordinates: ['1', '1']
        }
    });
    achievement.evaluate({
        geojson: {
            coordinates: ['1.1', '1.1']
        }
    });
    expect(achievement.count).toEqual(1);
});

test('Gaps', () => {
    achievement.evaluate({
        geojson: {
            coordinates: ['1.5', '1.5']
        }
    });
    achievement.evaluate({
        geojson: {
            coordinates: ['2', '1.5']
        }
    });
    expect(achievement.count).toEqual(2);
    achievement.evaluate({
        geojson: {
            coordinates: ['5', '5']
        }
    });
    expect(achievement.count).toEqual(3);
});

test('Missing Data', () => {
    achievement.evaluate({
        geojson: {
            coordinates: undefined
        }
    });
    achievement.evaluate({
        geojson: undefined
    });
    expect(achievement.count).toEqual(0);
});
