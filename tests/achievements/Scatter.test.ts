import AchievementData from '../../src/scripts/AchievementData';
import Scatter from '../../src/scripts/achievements/Scatter';
import { SPECIES_RANK, SUB_SPECIES_RANK } from '../../src/scripts/achievements/utils';

const achievement: AchievementData = Scatter;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        taxon: {
            rank_level: SPECIES_RANK
        },
        annotations: [{
            controlled_attribute_id: 22,
            controlled_value_id: 25
        }],
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
        taxon: {
            rank_level: SPECIES_RANK
        },
        annotations: [{
            controlled_attribute_id: 22,
            controlled_value_id: 25
        }],
        geojson: {
            coordinates: ['1', '1']
        }
    });
    expect(achievement.count).toEqual(1);
    achievement.evaluate({
        taxon: {
            rank_level: SUB_SPECIES_RANK
        },
        annotations: [{
            controlled_attribute_id: 22,
            controlled_value_id: 25
        }],
        geojson: {
            coordinates: ['2', '2']
        }
    });
    expect(achievement.count).toEqual(2);
    achievement.evaluate({
        taxon: {
            rank_level: SUB_SPECIES_RANK
        },
        annotations: [{
            controlled_attribute_id: 22,
            controlled_value_id: 25
        }],
        geojson: {
            coordinates: ['2.25', '2.25']
        }
    });
    expect(achievement.count).toEqual(3);
    achievement.evaluate({
        taxon: {
            rank_level: SUB_SPECIES_RANK
        },
        annotations: [{
            controlled_attribute_id: 22,
            controlled_value_id: 25
        }],
        geojson: {
            coordinates: ['2.1255', '2.1244']
        }
    });
    expect(achievement.count).toEqual(4);
});

test('Don\'t Count', () => {
    achievement.evaluate({
        taxon: {
            rank_level: SPECIES_RANK + 1
        },
        annotations: [{
            controlled_attribute_id: 22,
            controlled_value_id: 25
        }],
        geojson: {
            coordinates: ['1', '1']
        }
    });
    expect(achievement.count).toEqual(0);
    achievement.evaluate({
        taxon: {
            rank_level: SPECIES_RANK
        },
        annotations: [{
            controlled_attribute_id: 22,
            controlled_value_id: 1
        }],
        geojson: {
            coordinates: ['1', '1']
        }
    });
    expect(achievement.count).toEqual(0);
    achievement.evaluate({
        taxon: {
            rank_level: SPECIES_RANK
        },
        annotations: [{
            controlled_attribute_id: 1,
            controlled_value_id: 25
        }],
        geojson: {
            coordinates: ['1', '1']
        }
    });
    expect(achievement.count).toEqual(0);
});

test('Duplicates', () => {
    achievement.evaluate({
        taxon: {
            rank_level: SPECIES_RANK
        },
        annotations: [{
            controlled_attribute_id: 22,
            controlled_value_id: 25
        }],
        geojson: {
            coordinates: ['1', '1']
        }
    });
    achievement.evaluate({
        taxon: {
            rank_level: SPECIES_RANK
        },
        annotations: [{
            controlled_attribute_id: 22,
            controlled_value_id: 25
        }],
        geojson: {
            coordinates: ['1', '1']
        }
    });
    achievement.evaluate({
        taxon: {
            rank_level: SPECIES_RANK
        },
        annotations: [{
            controlled_attribute_id: 22,
            controlled_value_id: 25
        }],
        geojson: {
            coordinates: ['1.1', '1.1']
        }
    });
    expect(achievement.count).toEqual(1);
    achievement.evaluate({
        taxon: {
            rank_level: SPECIES_RANK
        },
        annotations: [{
            controlled_attribute_id: 22,
            controlled_value_id: 25
        }],
        geojson: {
            coordinates: ['1.1244', '1.1244']
        }
    });
    expect(achievement.count).toEqual(1);
    achievement.evaluate({
        taxon: {
            rank_level: SPECIES_RANK
        },
        annotations: [{
            controlled_attribute_id: 22,
            controlled_value_id: 25
        }],
        geojson: {
            coordinates: ['0.875', '0.875']
        }
    });
    expect(achievement.count).toEqual(1);
});

test('Gaps', () => {
    achievement.evaluate({
        taxon: {
            rank_level: SPECIES_RANK
        },
        annotations: [{
            controlled_attribute_id: 22,
            controlled_value_id: 25
        }],
        geojson: {
            coordinates: ['1', '1']
        }
    });
    achievement.evaluate({
        taxon: {
            rank_level: SPECIES_RANK
        },
        annotations: [{
            controlled_attribute_id: 22,
            controlled_value_id: 25
        }],
        geojson: {
            coordinates: ['1.25', '1.25']
        }
    });
    expect(achievement.count).toEqual(2);
    achievement.evaluate({
        taxon: {
            rank_level: SPECIES_RANK
        },
        annotations: [{
            controlled_attribute_id: 22,
            controlled_value_id: 25
        }],
        geojson: {
            coordinates: ['5', '5']
        }
    });
    expect(achievement.count).toEqual(3);
});

test('Missing Data', () => {
    achievement.evaluate({
        taxon: {
            rank_level: undefined
        },
        annotations: undefined,
        geojson: undefined
    });
    achievement.evaluate({
        taxon: undefined
    });
    expect(achievement.count).toEqual(0);
});
