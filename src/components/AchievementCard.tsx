import I18n from 'i18n-js';
import { memo, ReactElement } from 'react';
import { Card, Col, Image, OverlayTrigger, Popover, ProgressBar } from 'react-bootstrap';
import { AchievementType } from '../types/AchievementsTypes';
import HyperLink from './HyperLink';

export default memo(function AchievementCard(data: AchievementType) {
    const percentage = Math.floor(data.count / data.goal * 100);
    const popoverDetails = (
        <Popover>
            <Popover.Header className='Card-Popup-Title'>
                {I18n.t(data.title)}
            </Popover.Header>
            <Popover.Body className='Card-Popup-Text'>
                {I18n.t(data.details, { goal: data.goal })}
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
                <Card className={'border-0 p-2 Card' + ((percentage >= 100) ? ' Card-AnimateBG' : '')}>
                    <Card.Text
                        className={'Card-Text' + ((percentage >= 250) ? ' Shine' : '')}
                        style={{
                            color: data.textColor,
                            fontWeight: (percentage >= 150) ? 'bold' : undefined
                        }}
                    >
                        {getTitleRank(percentage)}
                    </Card.Text>
                    <Image src={require(`../badges/${data.icon}.svg`)} className={`Card-Icon-${data.iconColor}`} />
                    <Card.Title className='Card-Title' style={{ color: data.textColor, marginTop: 'auto' }}>
                        {I18n.t(data.title)}
                    </Card.Title>
                    <Card.Text className='Card-Text' style={{ color: data.textColor, marginTop: 'auto' }}>
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
                        <>
                            <HyperLink
                                linkContent={I18n.t('cardViewObservations')}
                                linkURL={`https://www.inaturalist.org/observations?id=${obs.join(',')}`}
                            />
                            <br />
                        </>
                    )
                }
            </>
        );
}

function getChunks<T>(items: T[]): T[][] {
    return items.reduce((chunks: T[][], item: T, index) => {
        const chunk = Math.floor(index / 100);
        chunks[chunk] = ([] as T[]).concat(chunks[chunk] || [], item);
        return chunks;
    }, []);
}

function getTitleRank(percentage: number) {
    if (percentage < 20 && percentage > 0) {
        return I18n.t('cardCasual')
    }
    else if (percentage < 50) {
        return I18n.t('cardNovice')
    }
    else if (percentage < 100) {
        return I18n.t('cardAdvanced')
    }
    else if (percentage < 200) {
        return I18n.t('cardExpert')
    }
    else if (percentage < 400) {
        return I18n.t('cardMaster')
    }
    else if (percentage >= 400) {
        return I18n.t('cardLegend')
    }
    return '';
}
