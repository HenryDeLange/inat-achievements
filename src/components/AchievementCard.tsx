import I18n from 'i18n-js';
import React, { memo } from 'react';
import { Card, Col, Image, OverlayTrigger, Popover, ProgressBar } from 'react-bootstrap';
import { AchievementType } from '../types/AchievementsTypes';

export default memo(function AchievementCard(data: AchievementType) {
    const percentage = Math.floor(data.count / data.goal * 100);
    const popoverDetails = (
        <Popover>
            <Popover.Header className='Card-Popup-Title'>
                {data.title}
            </Popover.Header>
            <Popover.Body className='Card-Popup-Text'>
                {data.details}
                <hr />
                {I18n.t('cardCompletedPercentage', { percentage })}
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
                        {data.title}
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

function getTitleRank(percentage: number) {
    if (percentage >= 200) {
        return I18n.t('cardMaster')
    }
    else if (percentage >= 100) {
        return I18n.t('cardExpert')
    }
    else if (percentage > 50) {
        return I18n.t('cardAdvanced')
    }
    else if (percentage > 25) {
        return I18n.t('cardNovice')
    }
    else if (percentage < 25 && percentage > 0) {
        return I18n.t('cardCasual')
    }
    return '';
}
