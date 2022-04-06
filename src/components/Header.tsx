import React, { useEffect, useState } from 'react';
import { Button, Col, Container, FormControl, Image, InputGroup, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import inat from '../images/inat_light.png';
import mywild from '../images/mywild.png';
import { RootState } from '../redux/ReduxStore';
import { setAllAchievements, updateAchievement } from '../redux/slices/AchievementsSlice';
import { setProgressLoading, setProgressValue } from '../redux/slices/ProgressSlice';
import { clearAchievements, getAchievements, getAchievementsAsType, initAchievements } from '../scripts/AchievementImplementations';
import { calculateAchievements } from '../scripts/ProcessData';

export default function Header() {
    // Loading
    const dispatch = useDispatch();
    const progressLoading = useSelector((state: RootState) => state.progress.loading);
    const handleClick = () => {
        dispatch(setProgressValue(0));
        dispatch(setProgressLoading(true));
        clearAchievements();
        initAchievements();
        dispatch(setAllAchievements(getAchievementsAsType()));
        console.log('<<< calculateAchievements >>>')
        calculateAchievements(dispatch, 'henrydelange', (observation) => {
            for (let achievementData of getAchievements()) {
                achievementData.evaluate(observation);
                dispatch(updateAchievement({ ...achievementData, evalFunc: undefined }));
            }
        });
    }
    // Popups
    const popoverURL = (
        <Popover>
            <Popover.Header as="h3">
                Available URL Parameters
            </Popover.Header>
            <Popover.Body>
                <b>user=username</b>
                <br />
                Immediately load the achievements for the specified user.
                <hr />
                <b>limit=100</b>
                <br />
                Limit the number of observations that are read.
            </Popover.Body>
        </Popover>
    );
    const popoverAbout = (
        <Popover>
            <Popover.Header as="h3">
                About Wild Achievements
            </Popover.Header>
            <Popover.Body>
                <Image src={mywild} className='App-logo' alt='MyWild' fluid />
                <hr />
                <Image src={inat} alt='iNaturalist' fluid />
            </Popover.Body>
        </Popover>
    );
    // Render
    return (
        <Container>
            <Row>
                <Container className="pt-3 pb-3 bg-success bg-opacity-10 rounded-3">
                    <Row className='p-3'>
                        <h1>Wild Achievements</h1>
                    </Row>
                    <Row className='p-3'>
                        <h4>Upload observation on iNaturalist.org to try and unlock all achievements!</h4>
                    </Row>
                    <Row className='p-1'>
                        <Col />
                        <Col sm='auto' className='p-1'>
                            <Button variant="outline-secondary">
                                Android App
                            </Button>
                        </Col>
                        <Col sm='auto' className='p-1'>
                            <OverlayTrigger trigger="click" placement="bottom" overlay={popoverURL}>
                                <Button variant="outline-secondary">
                                    URL Parameters
                                </Button>
                            </OverlayTrigger>
                        </Col>
                        <Col sm='auto' className='p-1'>
                            <OverlayTrigger trigger="click" placement="bottom" overlay={popoverAbout}>
                                <Button variant="outline-secondary">
                                    About
                                </Button>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                </Container>
            </Row>
            <Container className="p-5 rounded-5">
                <Row>
                    <InputGroup size='lg'>
                        <FormControl
                            type='text'
                            className='form-control'
                            placeholder='iNaturalist Username'
                            aria-label='Username'
                            aria-describedby='inputGroup-sizing-lg'
                        />
                        <Button
                            variant="success"
                            disabled={progressLoading}
                            onClick={!progressLoading ? handleClick : undefined}
                        >
                            {!progressLoading ? 'Calculate Achievements' : 'Loading Achievements'}
                        </Button>
                    </InputGroup>
                </Row>
            </Container>
        </Container>
    );
}
