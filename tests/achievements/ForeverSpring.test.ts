import AchievementData from '../../src/scripts/AchievementData';
import ForeverSpring from '../../src/scripts/achievements/ForeverSpring';

const achievement: AchievementData = ForeverSpring;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 47125, 5, 6, 7]
        },
        observed_on_details: {
            week: 1
        },
        annotations: [{
            controlled_attribute_id: 12,
            controlled_value_id: 13
        }]
    });
    expect(achievement.count).toEqual(1);
    achievement.reset();
    expect(achievement.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47125]
        },
        observed_on_details: {
            week: 1
        },
        annotations: [{
            controlled_attribute_id: 12,
            controlled_value_id: 13
        }]
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47125]
        },
        observed_on_details: {
            week: 2
        },
        annotations: [{
            controlled_attribute_id: 12,
            controlled_value_id: 13
        }]
    });
    expect(achievement.count).toEqual(2);
});

test('Don\'t Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1]
        },
        observed_on_details: {
            week: 1
        },
        annotations: [{
            controlled_attribute_id: 12,
            controlled_value_id: 13
        }]
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47125]
        },
        observed_on_details: {
            week: 2
        },
        annotations: [{
            controlled_attribute_id: 1,
            controlled_value_id: 13
        }]
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47125]
        },
        observed_on_details: {
            week: 1
        },
        annotations: [{
            controlled_attribute_id: 12,
            controlled_value_id: 1
        }]
    });
    expect(achievement.count).toEqual(0);
});

test('Duplicates', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47125]
        },
        observed_on_details: {
            week: 1
        },
        annotations: [{
            controlled_attribute_id: 12,
            controlled_value_id: 13
        }]
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47125]
        },
        observed_on_details: {
            week: 1
        },
        annotations: [{
            controlled_attribute_id: 12,
            controlled_value_id: 13
        }]
    });
    expect(achievement.count).toEqual(1);
});

test('Gaps', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47125]
        },
        observed_on_details: {
            week: 2
        },
        annotations: [{
            controlled_attribute_id: 12,
            controlled_value_id: 13
        }]
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47125]
        },
        observed_on_details: {
            week: 4
        },
        annotations: [{
            controlled_attribute_id: 12,
            controlled_value_id: 13
        }]
    });
    expect(achievement.count).toEqual(2);
});

test('Missing Data', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: undefined
        },
        observed_on_details: {
            week: undefined
        },
        annotations: undefined
    });
    achievement.evaluate({
        taxon: undefined,
        observed_on_details: undefined
    });
    expect(achievement.count).toEqual(0);
});
