import React, { memo } from 'react';
import { Container, Row } from 'react-bootstrap';
import AchievementData from '../scripts/AchievementData';
import AchievementCard from './AchievementCard';

export default memo(function Achievements() {
    // TODO: Maybe sort the list to show passed achievements first?
    let list: AchievementData[] = [
        new AchievementData(
            'test1',
            'test 111',
            'TryMammals',
            30,
            () => { return 0; },
            31
        ),
        new AchievementData(
            'test2',
            'test 222',
            'LifeLister',
            20,
            () => { return 0; },
            15
        ),
        new AchievementData(
            'test3',
            'test 333',
            'RatKing',
            50,
            () => { return 0; },
            5
        ),
        new AchievementData(
            'test4',
            'test 444',
            'KingFisher',
            100,
            () => { return 0; },
            0
        )
    ];
    return (
        <Container>
            <Row>
                {list.map((listValue) => <AchievementCard {...listValue} key={"key" + listValue.title} />)}
            </Row>
        </Container>
    );
});
