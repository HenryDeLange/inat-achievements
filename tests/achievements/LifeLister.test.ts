import AchievementWrapper from '../../src/scripts/AchievementWrapper';
import LifeLister from '../../src/scripts/achievements/LifeLister';
import { SPECIES_RANK, SUB_SPECIES_RANK } from '../../src/scripts/achievements/utils';

const achievement: AchievementWrapper = LifeLister;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        taxon: {
            id: 1,
            rank_level: SPECIES_RANK
        },
        observed_on_details: {
            year: 2022
        }
    });
    expect(achievement.data.count).toEqual(1);
    achievement.reset();
    expect(achievement.data.count).toEqual(0);
});

test('Count', () => {
    achievement.evaluate({
        taxon: {
            id: 1,
            rank_level: SPECIES_RANK
        },
        observed_on_details: {
            year: 2022
        }
    });
    expect(achievement.data.count).toEqual(1);
    achievement.evaluate({
        taxon: {
            parent_id: 2,
            rank_level: SUB_SPECIES_RANK
        },
        observed_on_details: {
            year: 2022
        }
    });
    expect(achievement.data.count).toEqual(2);
});

test('Don\'t Count', () => {
    achievement.evaluate({
        taxon: {
            id: 1,
            rank_level: SPECIES_RANK + 1
        },
        observed_on_details: {
            year: 2022
        }
    });
    expect(achievement.data.count).toEqual(0);
});

test('Duplicates', () => {
    achievement.evaluate({
        taxon: {
            id: 1,
            rank_level: SPECIES_RANK
        },
        observed_on_details: {
            year: 2022
        }
    });
    achievement.evaluate({
        taxon: {
            id: 1,
            rank_level: SPECIES_RANK
        },
        observed_on_details: {
            year: 2022
        }
    });
    achievement.evaluate({
        taxon: {
            parent_id: 1,
            rank_level: SUB_SPECIES_RANK
        },
        observed_on_details: {
            year: 2022
        }
    });
    expect(achievement.data.count).toEqual(1);
    achievement.evaluate({
        taxon: {
            parent_id: 2,
            rank_level: SUB_SPECIES_RANK
        },
        observed_on_details: {
            year: 2022
        }
    });
    achievement.evaluate({
        taxon: {
            parent_id: 2,
            rank_level: SUB_SPECIES_RANK
        },
        observed_on_details: {
            year: 2022
        }
    });
    expect(achievement.data.count).toEqual(2);
});

test('Gaps', () => {
    achievement.evaluate({
        taxon: {
            id: 1,
            rank_level: SPECIES_RANK
        },
        observed_on_details: {
            year: 2022
        }
    });
    achievement.evaluate({
        taxon: {
            parent_id: 2,
            rank_level: SUB_SPECIES_RANK
        },
        observed_on_details: {
            year: 2022
        }
    });
    expect(achievement.data.count).toEqual(2);
    achievement.evaluate({
        taxon: {
            id: 11,
            rank_level: SPECIES_RANK
        },
        observed_on_details: {
            year: 2021
        }
    });
    achievement.evaluate({
        taxon: {
            parent_id: 12,
            rank_level: SUB_SPECIES_RANK
        },
        observed_on_details: {
            year: 2021
        }
    });
    achievement.evaluate({
        taxon: {
            id: 13,
            rank_level: SPECIES_RANK
        },
        observed_on_details: {
            year: 2021
        }
    });
    achievement.evaluate({
        taxon: {
            parent_id: 14,
            rank_level: SUB_SPECIES_RANK
        },
        observed_on_details: {
            year: 2021
        }
    });
    expect(achievement.data.count).toEqual(4);
});

test('Missing Data', () => {
    achievement.evaluate({
        taxon: {
            id: undefined,
            parent_id: undefined,
            rank_level: undefined
        },
        observed_on_details: {
            year: undefined
        }
    });
    achievement.evaluate({
        taxon: undefined,
        observed_on_details: undefined
    });
    expect(achievement.data.count).toEqual(0);
});
