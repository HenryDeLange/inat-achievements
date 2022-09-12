import DailyLife from '../../src/scripts/achievements/DailyLife';
import { SPECIES_RANK, SUB_SPECIES_RANK } from '../../src/scripts/achievements/utils';

test('reset', () => {
    for (let i = 1; i <= 24; i++) {
        DailyLife.evaluate({
            taxon: {
                rank_level: SPECIES_RANK,
                id: i
            },
            observed_on_details: {
                date: '2022-01-01'
            }
        });
    }
    expect(DailyLife.count).toEqual(1);
    DailyLife.reset();
    expect(DailyLife.count).toEqual(0);
});

test('evaluate count', () => {
    DailyLife.reset();
    for (let i = 1; i <= 24 * 3.5; i++) {
        DailyLife.evaluate({
            taxon: {
                rank_level: SPECIES_RANK,
                id: i
            },
            observed_on_details: {
                date: '2022-01-15'
            }
        });
    }
    expect(DailyLife.count).toEqual(1);
    for (let i = 1; i <= 24; i++) {
        DailyLife.evaluate({
            taxon: {
                rank_level: SUB_SPECIES_RANK,
                parent_id: i
            },
            observed_on_details: {
                date: '2022-01-14'
            }
        });
    }
    expect(DailyLife.count).toEqual(2);
});

test('evaluate duplicates', () => {
    DailyLife.reset();
    for (let i = 1; i <= 24 * 2.5; i++) {
        DailyLife.evaluate({
            taxon: {
                rank_level: SPECIES_RANK,
                id: Math.floor(i / 2)
            },
            observed_on_details: {
                date: '2022-01-01'
            }
        });
        DailyLife.evaluate({
            taxon: {
                rank_level: SUB_SPECIES_RANK,
                parent_id: Math.floor(i / 2)
            },
            observed_on_details: {
                date: '2022-01-01'
            }
        });
    }
    expect(DailyLife.count).toEqual(1);
});

test('evaluate gaps', () => {
    DailyLife.reset();
    for (let i = 1; i <= 25; i++) {
        DailyLife.evaluate({
            taxon: {
                rank_level: SPECIES_RANK,
                id: i
            },
            observed_on_details: {
                date: `2022-02-${i < 10 ? `0${i}` : i}`
            }
        });
    }
    expect(DailyLife.count).toEqual(0);
});

test('evaluate missing', () => {
    DailyLife.reset()
    for (let i = 1; i <= 24; i++) {
        DailyLife.evaluate({
            taxon: undefined,
            observed_on_details: {
                date: '2022-01-01'
            }
        });
        DailyLife.evaluate({
            taxon: {
                rank_level: SUB_SPECIES_RANK,
                parent_id: undefined
            },
            observed_on_details: {
                date: '2022-01-01'
            }
        });
        DailyLife.evaluate({
            taxon: {
                rank_level: SPECIES_RANK,
                id: undefined
            },
            observed_on_details: {
                date: '2022-01-01'
            }
        });
        DailyLife.evaluate({
            taxon: {
                rank_level: undefined,
                parent_id: 1
            },
            observed_on_details: {
                date: '2022-01-01'
            }
        });
        DailyLife.evaluate({
            taxon: {
                rank_level: undefined,
                id: 1
            },
            observed_on_details: {
                date: '2022-01-01'
            }
        });
        DailyLife.evaluate({
            taxon: {
                rank_level: SPECIES_RANK,
                id: 1
            },
            observed_on_details: {
                date: undefined
            }
        });
        DailyLife.evaluate({
            taxon: {
                rank_level: SPECIES_RANK,
                id: 1
            },
            observed_on_details: undefined
        });
    }
    expect(DailyLife.count).toEqual(0);
});
