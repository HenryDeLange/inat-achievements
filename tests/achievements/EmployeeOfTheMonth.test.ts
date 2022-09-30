import AchievementData from '../../src/scripts/AchievementData';
import EmployeeOfTheMonth from '../../src/scripts/achievements/EmployeeOfTheMonth';

const achievement: AchievementData = EmployeeOfTheMonth;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 118903, 5, 6, 7]
        },
        observed_on_details: {
            year: 2022,
            month: 1
        }
    });
    expect(achievement.count).toEqual(1);
    achievement.reset();
    expect(achievement.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [118903]
        },
        observed_on_details: {
            year: 2022,
            month: 1
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [47336]
        },
        observed_on_details: {
            year: 2022,
            month: 1
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [538904]
        },
        observed_on_details: {
            year: 2022,
            month: 1
        }
    });
    expect(achievement.count).toEqual(3);
});

test('Don\'t Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1]
        },
        observed_on_details: {
            year: 2022,
            month: 1
        }
    });
    expect(achievement.count).toEqual(0);
});

test('Duplicates', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [118903]
        },
        observed_on_details: {
            year: 2022,
            month: 1
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [118903]
        },
        observed_on_details: {
            year: 2022,
            month: 1
        }
    });
    expect(achievement.count).toEqual(2);
});

test('Gaps', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [118903]
        },
        observed_on_details: {
            year: 2022,
            month: 2
        }
    });
    expect(achievement.count).toEqual(1);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [118903]
        },
        observed_on_details: {
            year: 2022,
            month: 1
        }
    });
    expect(achievement.count).toEqual(1);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [118903]
        },
        observed_on_details: {
            year: 2022,
            month: 1
        }
    });
    expect(achievement.count).toEqual(2);
});

test('Missing Data', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: undefined
        },
        observed_on_details: {
            year: undefined,
            month: undefined
        }
    });
    achievement.evaluate({
        taxon: undefined,
        observed_on_details: undefined
    });
    expect(achievement.count).toEqual(0);
});
