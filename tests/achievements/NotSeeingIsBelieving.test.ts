import AchievementWrapper from '../../src/scripts/AchievementWrapper';
import NotSeeingIsBelieving from '../../src/scripts/achievements/NotSeeingIsBelieving';

const achievement: AchievementWrapper = NotSeeingIsBelieving;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        annotations: [{
            controlled_attribute_id: 22,
            controlled_value_id: 1
        }]
    });
    expect(achievement.data.count).toEqual(1);
    achievement.reset();
    expect(achievement.data.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        annotations: [{
            controlled_attribute_id: 22,
            controlled_value_id: 1
        }]
    });
    expect(achievement.data.count).toEqual(1);
});

test('Don\'t Count', () => {
    achievement.evaluate({
        annotations: [{
            controlled_attribute_id: 22,
            controlled_value_id: 24
        }]
    });
    expect(achievement.data.count).toEqual(0);
    achievement.evaluate({
        annotations: [{
            controlled_attribute_id: 22,
            controlled_value_id: 24
        },{
            controlled_attribute_id: 1,
            controlled_value_id: 1
        }]
    });
    expect(achievement.data.count).toEqual(0);
});

test('Duplicates', () => {
    achievement.evaluate({
        annotations: [{
            controlled_attribute_id: 22,
            controlled_value_id: 1
        }]
    });
    achievement.evaluate({
        annotations: [{
            controlled_attribute_id: 22,
            controlled_value_id: 1
        }]
    });
    expect(achievement.data.count).toEqual(2);
});

test('Missing Data', () => {
    achievement.evaluate({
        annotations: undefined
    });
    expect(achievement.data.count).toEqual(0);
});
