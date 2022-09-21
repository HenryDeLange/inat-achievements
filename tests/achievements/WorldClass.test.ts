import AchievementData from '../../src/scripts/AchievementData';
import WorldClass from '../../src/scripts/achievements/WorldClass';

const achievement: AchievementData = WorldClass;

afterEach(() => achievement.reset());

test('Reset', () => {
    achievement.evaluate({
        taxon: {
            ancestor_ids: [48460, 1, 47120, 372739, 47158]
        }
    });
    expect(achievement.count).toEqual(1);
    achievement.reset();
    expect(achievement.count).toEqual(0);
});

// test('Count', () => {
//     achievement.evaluate({
//         taxon: {
//             ancestor_ids: [000]
//         },
//         observed_on_details: {
//             date: '2022-01-01'
//         }
//     });
//     expect(achievement.count).toEqual(1);
// });

// test('Don\'t Count', () => {
//     achievement.evaluate({
//         taxon: {
//             ancestor_ids: [000]
//         },
//         observed_on_details: {
//             date: '2022-01-01'
//         }
//     });
//     expect(achievement.count).toEqual(0);
// });

// test('Duplicates', () => {
//     achievement.evaluate({
//         taxon: {
//             ancestor_ids: [000]
//         },
//         observed_on_details: {
//             date: '2022-01-01'
//         }
//     });
//     expect(achievement.count).toEqual(1);
// });

// test('Gaps', () => {
//     achievement.evaluate({
//         taxon: {
//             ancestor_ids: [000]
//         },
//         observed_on_details: {
//             date: '2022-01-01'
//         }
//     });
//     expect(achievement.count).toEqual(1);
// });

// test('Missing Data', () => {
//     achievement.evaluate({
//         taxon: {
//             ancestor_ids: undefined
//         },
//         observed_on_details: {
//             date: undefined
//         }
//     });
//     achievement.evaluate({
//         taxon: undefined,
//         observed_on_details: undefined
//     });
//     expect(achievement.count).toEqual(0);
// });
