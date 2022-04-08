import React, { memo } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/ReduxStore';
import { AchievementType } from '../types/AchievementsTypes';
import AchievementCard from './AchievementCard';

export default memo(function Achievements() {
    const achievementData = useSelector((state: RootState) => state.achievements.data);
    let list: AchievementType[] = Array.from(achievementData.values()).sort((a, b) => {
        const percentageCompletedA = a.count / a.goal * 100;
        const percentageCompletedB = b.count / b.goal * 100;
        if (percentageCompletedA === percentageCompletedB) {
            return a.title > b.title ? 1 : -1;
        }
        return percentageCompletedA > percentageCompletedB ? -1 : 1;
    });
    return (
        <Container>
            <Row>
                {list.map((listValue) => <AchievementCard {...listValue} key={'key' + listValue.title} />)}
            </Row>
        </Container>
    );
});
