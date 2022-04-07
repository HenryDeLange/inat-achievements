import React, { memo } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/ReduxStore';
import { AchievementType } from '../types/AchievementsTypes';
import AchievementCard from './AchievementCard';

export default memo(function Achievements() {
    const achievementData = useSelector((state: RootState) => state.achievements.data);
    let list: AchievementType[] = Array.from(achievementData.values());
// TODO: Maybe sort the list to show passed achievements first?
    return (
        <Container>
            <Row>
                {list.map((listValue) => <AchievementCard {...listValue} key={"key" + listValue.title} />)}
            </Row>
        </Container>
    );
});
