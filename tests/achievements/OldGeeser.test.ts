import AchievementWrapper from '../../src/scripts/AchievementWrapper';
import OldGeeser from '../../src/scripts/achievements/OldGeeser';

const achievement: AchievementWrapper = OldGeeser;
const currentDate = new Date();

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1, 2, 3, 6912, 5, 6, 7]
        },
        observed_on_details: {
            year: currentDate.getFullYear() - 1,
            month: currentDate.getMonth(),
            day: currentDate.getDate()
        }
    });
    expect(achievement.data.count).toEqual(1);
    achievement.reset();
    expect(achievement.data.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [6912]
        },
        observed_on_details: {
            year: currentDate.getFullYear() - 5,
            month: currentDate.getMonth(),
            day: currentDate.getDate()
        }
    });
    expect(achievement.data.count).toEqual(5);
});

test('Don\'t Count', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [1]
        },
        observed_on_details: {
            year: currentDate.getFullYear() - 1,
            month: currentDate.getMonth(),
            day: currentDate.getDate()
        }
    });
    expect(achievement.data.count).toEqual(0);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [6912]
        },
        observed_on_details: {
            year: currentDate.getFullYear(),
            month: currentDate.getMonth() - 5,
            day: currentDate.getDate()
        }
    });
    expect(achievement.data.count).toEqual(0);
});

test('Duplicates', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [6912]
        },
        observed_on_details: {
            year: currentDate.getFullYear() - 1,
            month: currentDate.getMonth(),
            day: currentDate.getDate()
        }
    });
    achievement.evaluate({
        taxon: {
            ancestor_ids: [6912]
        },
        observed_on_details: {
            year: currentDate.getFullYear() - 1,
            month: currentDate.getMonth(),
            day: currentDate.getDate()
        }
    });
    expect(achievement.data.count).toEqual(1);
});

test('Gaps', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [6912]
        },
        observed_on_details: {
            year: currentDate.getFullYear() - 1,
            month: currentDate.getMonth(),
            day: currentDate.getDate()
        }
    });
    expect(achievement.data.count).toEqual(1);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [6912]
        },
        observed_on_details: {
            year: currentDate.getFullYear() - 10,
            month: currentDate.getMonth(),
            day: currentDate.getDate()
        }
    });
    expect(achievement.data.count).toEqual(10);
    achievement.evaluate({
        taxon: {
            ancestor_ids: [6912]
        },
        observed_on_details: {
            year: currentDate.getFullYear() - 5,
            month: currentDate.getMonth(),
            day: currentDate.getDate()
        }
    });
    expect(achievement.data.count).toEqual(10);
});

test('Missing Data', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: undefined
        },
        observed_on_details: {
            year: undefined,
            month: undefined,
            day: undefined
        }
    });
    achievement.evaluate({
        taxon: undefined,
        observed_on_details: undefined
    });
    expect(achievement.data.count).toEqual(0);
});
