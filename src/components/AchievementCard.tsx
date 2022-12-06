import I18n from 'i18n-js';
import Lottie from 'lottie-react';
import { memo, ReactElement } from 'react';
import { Card, Col, Image, OverlayTrigger, Popover, ProgressBar } from 'react-bootstrap';
import { AchievementType } from '../types/AchievementsTypes';
import HyperLink from './HyperLink';
import lottieAnimation from "../badges/animations/AirLovers.json";

const CASUAL = 15;
const NOVICE = 30;
const COMPETENT = 60;
const PROFICIENT = 100;
const EXPERT = 250;
const MASTER = 500;

export default memo(function AchievementCard(data: AchievementType) {
    const percentage = Math.floor(data.count / data.goal * 100);
    const textColor = calcTextColor(percentage);
    const iconColor = calcIconColor(percentage);
    const popoverDetails = (
        <Popover>
            <Popover.Header className='Card-Popup-Title'>
                {percentage >= CASUAL ? I18n.t(data.title) : <i>{I18n.t('cardMysteryTitle')}</i>}
            </Popover.Header>
            <Popover.Body className='Card-Popup-Text'>
                {percentage >= NOVICE ? I18n.t(data.details, { goal: data.goal }) : <i>{I18n.t('cardMysteryDetails')}</i>}
                <hr />
                {I18n.t('cardCompletedPercentage', { percentage })}
                <hr />
                <ViewObservations observations={data.observations} />
            </Popover.Body>
        </Popover>
    );
    return (
        <Col className='col-6 col-sm-4 col-md-3 col-lg-2 pb-4 d-flex align-items-stretch'>
            <OverlayTrigger trigger='click' placement='top' overlay={popoverDetails} rootClose>
                <Card className={'border-0 p-2 Card' + ((percentage >= PROFICIENT) ? ((percentage >= EXPERT) ? ' Card-AnimateExpertBG' : ' Card-AnimateBG') : '')}>
                    <Card.Text
                        className={'Card-Text' + ((percentage >= EXPERT) ? ' Shine' : '')}
                        style={{
                            color: textColor,
                            fontWeight: (percentage >= EXPERT) ? 'bold' : undefined
                        }}
                    >
                        {getTitleRank(percentage)}
                    </Card.Text>
                    <Card.Title className='Card-Title' style={{ color: textColor, marginTop: 'auto' }}>
                        {percentage >= CASUAL ? I18n.t(data.title) : ''}
                    </Card.Title>
                    <Image src={require(`../badges/${data.icon}.svg`)} className={iconColor} />
                    {/* <Lottie
                        animationData={lottieAnimation}
                        loop={true}
                    /> */}
                    <Card.Text className='Card-Text' style={{ color: textColor, marginTop: 'auto' }}>
                        {I18n.t('cardCountOfGoal', { count: data.count, goal: data.goal })}
                    </Card.Text>
                    <ProgressBar variant='success' now={percentage} style={{ height: 5 }} />
                </Card>
            </OverlayTrigger>
        </Col>
    );
});

type ViewObservationsType = {
    observations: number[];
}
function ViewObservations({ observations }: ViewObservationsType): ReactElement {
    if (observations.length === 0) {
        return (<span>{I18n.t('cardNoObservations')}</span>);
    }
    const chunks = getChunks(observations);
    return (<>
        {
            chunks.map((obs, index) =>
                <div key={index}>
                    <HyperLink
                        linkContent={I18n.t('cardViewObservations')}
                        linkURL={`https://www.inaturalist.org/observations?id=${obs.join(',')}`}
                    />
                    <br />
                </div>
            )
        }
    </>);
}

function getChunks<T>(items: T[]): T[][] {
    return items.reduce((chunks: T[][], item: T, index) => {
        const chunk = Math.floor(index / 100);
        chunks[chunk] = ([] as T[]).concat(chunks[chunk] || [], item);
        return chunks;
    }, []);
}

function getTitleRank(percentage: number) {
    if (percentage <= 0) {
        return I18n.t('cardStarted');
    }
    else if (percentage < CASUAL) {
        return I18n.t('cardCasual');
    }
    else if (percentage < NOVICE) {
        return I18n.t('cardNovice');
    }
    else if (percentage < COMPETENT) {
        return I18n.t('cardCompetent');
    }
    else if (percentage < PROFICIENT) {
        return I18n.t('cardProficient');
    }
    else if (percentage < EXPERT) {
        return I18n.t('cardExpert');
    }
    else if (percentage < MASTER) {
        return I18n.t('cardMaster');
    }
    else if (percentage >= MASTER) {
        return I18n.t('cardLegend');
    }
    return '';
}

function calcTextColor(percentage: number) {
    if (percentage <= 0) {
        return 'grey';
    }
    else if (percentage < CASUAL) {
        return 'Grey';
    }
    else if (percentage < NOVICE) {
        return 'DarkOliveGreen';
    }
    else if (percentage < COMPETENT) {
        return 'Green';
    }
    else if (percentage < PROFICIENT) {
        return 'Green';
    }
    else if (percentage >= PROFICIENT) {
        return 'Green';
    }
    return 'Red';
}

function calcIconColor(percentage: number) {
    if (percentage < CASUAL) {
        return 'Card-Icon-Silhouette';
    }
    else if (percentage < NOVICE) {
        return 'Card-Icon-Threshold';
    }
    else if (percentage < COMPETENT) {
        return 'Card-Icon-Half';
    }
    else if (percentage < PROFICIENT) {
        return 'Card-Icon-Almost';
    }
    else if (percentage >= PROFICIENT) {
        return 'Card-Icon-Full';
    }
    return 'Card-Icon-Fail';
}
