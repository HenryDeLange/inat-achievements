import { memo } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/ReduxStore';
import { AchievementType } from '../types/AchievementsTypes';
import AchievementCard from './AchievementCard';
import Lottie from 'lottie-react';
import first from "../badges/animations/1.json";
import percent10 from "../badges/animations/10.json";
import percent25 from "../badges/animations/25.json";
import percent50 from "../badges/animations/50.json";
import percent75 from "../badges/animations/75.json";
import percent100 from "../badges/animations/100.json";
import I18n from 'i18n-js';

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
    const achievedTotal = list.reduce((c, achievement) => (achievement.count >= achievement.goal) ? c + 1 : c, 0);
    const percentageOfAllAchieved = achievedTotal / achievementData.length * 100;
    return (
        <Container>
            {achievedTotal >= 1 && <>
                <Row>
                    <Container>
                        <h4>{I18n.t('achievementTotal', { count: achievedTotal })}</h4>
                    </Container>
                </Row>
                <Row className='mb-5'>
                    <Container>
                        {achievedTotal >= 1 && <Lottie className='Achievements-Lottie m-3' loop={true} animationData={first} /> }
                        {percentageOfAllAchieved >= 10 && <Lottie className='Achievements-Lottie m-3' loop={true} animationData={percent10} /> }
                        {percentageOfAllAchieved >= 25 && <Lottie className='Achievements-Lottie m-3' loop={true} animationData={percent25} /> }
                        {percentageOfAllAchieved >= 50 && <Lottie className='Achievements-Lottie m-3' loop={true} animationData={percent50} /> }
                        {percentageOfAllAchieved >= 75 && <Lottie className='Achievements-Lottie m-3' loop={true} animationData={percent75} /> }
                        {percentageOfAllAchieved >= 100 && <Lottie className='Achievements-Lottie m-3' loop={true} animationData={percent100} /> }
                    </Container>
                </Row>
            </>}
            <Row>
                {list.map((listValue) => listValue.count > 0 ? <AchievementCard {...listValue} key={'key' + listValue.title} /> : undefined)}
            </Row>
        </Container>
    );
});
