import React, { memo } from 'react';
import { Card, Col, Image, OverlayTrigger, Popover } from 'react-bootstrap';
import { AchievementType } from '../types/AchievementsTypes';

export default memo(function AchievementCard(data: AchievementType) {
    const popoverDetails = (
        <Popover>
            <Popover.Header className='Card-Popup-Title'>
                {data.title}
            </Popover.Header>
            <Popover.Body className='Card-Popup-Text'>
                {data.details}
                <hr />
                {`Completed ${Math.floor(data.count / data.goal * 100)}%`}
            </Popover.Body>
        </Popover>
    );
    return (
        <Col className='col-6 col-sm-4 col-md-3 col-lg-2 pb-4 d-flex align-items-stretch'>
            <OverlayTrigger trigger='click' placement='top' overlay={popoverDetails} rootClose>
                <Card className='border-0 p-2 Card'>
                    <Image src={require(`../badges/${data.icon}.svg`)} className={`Card-Icon-${data.iconColor}`} />
                    <Card.Title className='Card-Title' style={{ color: data.textColor }}>
                        {data.title}
                    </Card.Title>
                    <Card.Text className='Card-Text' style={{ color: data.textColor }}>
                        {`${data.count} of ${data.goal}`}
                    </Card.Text>
                </Card>
            </OverlayTrigger>
        </Col>
    );
});
