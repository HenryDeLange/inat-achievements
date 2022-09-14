import AchievementData from '../../src/scripts/AchievementData';
import AllCorners from '../../src/scripts/achievements/AllCorners';

const achievement: AchievementData = AllCorners;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        geojson: {
            coordinates: [ '1', '1' ]
        }
    });
    expect(achievement.count).toEqual(1);
    achievement.reset();
    expect(achievement.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        geojson: {
            coordinates: [ '1', '1' ]
        }
    });
    achievement.evaluate({
        geojson: {
            coordinates: [ '-1', '-1' ]
        }
    });
    achievement.evaluate({
        geojson: {
            coordinates: [ '-1', '1' ]
        }
    });
    achievement.evaluate({
        geojson: {
            coordinates: [ '1', '-1' ]
        }
    });
    expect(achievement.count).toEqual(4);
});

test('Don\'t Count', () => {
    achievement.evaluate({
        geojson: {
            coordinates: [ '0', '0' ]
        }
    });
    expect(achievement.count).toEqual(0);
});

test('Duplicates', () => {
    achievement.evaluate({
        geojson: {
            coordinates: [ '1', '1' ]
        }
    });
    achievement.evaluate({
        geojson: {
            coordinates: [ '1', '1' ]
        }
    });
    expect(achievement.count).toEqual(1);
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
