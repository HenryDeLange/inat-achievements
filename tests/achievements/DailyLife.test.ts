import AchievementWrapper from '../../src/scripts/AchievementWrapper';
import DailyLife from '../../src/scripts/achievements/DailyLife';
import { SPECIES_RANK, SUB_SPECIES_RANK } from '../../src/scripts/achievements/utils';

const achievement: AchievementWrapper = DailyLife;

afterEach(() => achievement.reset());

test('Reset', () => {
    for (let i = 1; i <= 24; i++) {
        achievement.evaluate({
            taxon: {
                rank_level: SPECIES_RANK,
                id: i
            },
            observed_on_details: {
                date: '2022-01-01'
            }
        });
    }
    expect(achievement.data.count).toEqual(1);
    achievement.reset();
    expect(achievement.data.count).toEqual(0);
});

test('Count', () => {
    for (let i = 1; i <= 24 * 3.5; i++) {
        achievement.evaluate({
            taxon: {
                rank_level: SPECIES_RANK,
                id: i
            },
            observed_on_details: {
                date: '2022-01-15'
            }
        });
    }
    expect(achievement.data.count).toEqual(1);
    for (let i = 1; i <= 24; i++) {
        achievement.evaluate({
            taxon: {
                rank_level: SUB_SPECIES_RANK,
                parent_id: i
            },
            observed_on_details: {
                date: '2022-01-14'
            }
        });
    }
    expect(achievement.data.count).toEqual(2);
});

test('Don\'t Count', () => {
    for (let i = 1; i <= 24 * 3.5; i++) {
        achievement.evaluate({
            taxon: {
                rank_level: 15,
                id: i
            },
            observed_on_details: {
                date: '2022-01-15'
            }
        });
    }
    expect(achievement.data.count).toEqual(0);
    for (let i = 1; i <= 24; i++) {
        achievement.evaluate({
            taxon: {
                rank_level: SPECIES_RANK,
                parent_id: i
            },
            observed_on_details: {
                date: `2022-01-${i <= 9 ? `0${i}` : i}`
            }
        });
    }
    expect(achievement.data.count).toEqual(0);
});

test('Duplicates', () => {
    for (let i = 1; i <= 24 * 2.5; i++) {
        achievement.evaluate({
            taxon: {
                rank_level: SPECIES_RANK,
                id: Math.floor(i / 2)
            },
            observed_on_details: {
                date: '2022-01-01'
            }
        });
        achievement.evaluate({
            taxon: {
                rank_level: SUB_SPECIES_RANK,
                parent_id: Math.floor(i / 2)
            },
            observed_on_details: {
                date: '2022-01-01'
            }
        });
    }
    expect(achievement.data.count).toEqual(1);
});

test('Gaps', () => {
    for (let i = 1; i <= 25; i++) {
        achievement.evaluate({
            taxon: {
                rank_level: SPECIES_RANK,
                id: i
            },
            observed_on_details: {
                date: `2022-02-${i < 10 ? `0${i}` : i}`
            }
        });
    }
    expect(achievement.data.count).toEqual(0);
});

test('Missing Data', () => {
    for (let i = 1; i <= 24; i++) {
        achievement.evaluate({
            taxon: undefined,
            observed_on_details: {
                date: '2022-01-01'
            }
        });
        achievement.evaluate({
            taxon: {
                rank_level: SUB_SPECIES_RANK,
                parent_id: undefined
            },
            observed_on_details: {
                date: '2022-01-01'
            }
        });
        achievement.evaluate({
            taxon: {
                rank_level: SPECIES_RANK,
                id: undefined
            },
            observed_on_details: {
                date: '2022-01-01'
            }
        });
        achievement.evaluate({
            taxon: {
                rank_level: undefined,
                parent_id: 1
            },
            observed_on_details: {
                date: '2022-01-01'
            }
        });
        achievement.evaluate({
            taxon: {
                rank_level: undefined,
                id: 1
            },
            observed_on_details: {
                date: '2022-01-01'
            }
        });
        achievement.evaluate({
            taxon: {
                rank_level: SPECIES_RANK,
                id: 1
            },
            observed_on_details: {
                date: undefined
            }
        });
        achievement.evaluate({
            taxon: {
                rank_level: SPECIES_RANK,
                id: 1
            },
            observed_on_details: undefined
        });
    }
    expect(achievement.data.count).toEqual(0);
});
