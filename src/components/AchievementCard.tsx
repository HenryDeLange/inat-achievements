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
                {`Completed ${percentage}%`}
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
                        {`${data.count} of ${data.goal}`}
                    </Card.Text>
                    <ProgressBar variant='success' now={percentage} style={{ height: 5 }} />
                </Card>
            </OverlayTrigger>
        </Col>
    );
});

function getTitleRank(percentage: number) {
    if (percentage >= 200) {
        return 'Master'
    }
    else if (percentage >= 100) {
        return 'Expert'
    }
    else if (percentage > 50) {
        return 'Advanced'
    }
    else if (percentage > 25) {
        return 'Novice'
    }
    else if (percentage < 25 && percentage > 0) {
        return 'Casual'
    }
    return '';
}
