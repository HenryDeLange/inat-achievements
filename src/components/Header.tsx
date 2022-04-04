import React, { useEffect, useState } from 'react';
import { Button, Col, Container, FormControl, Image, InputGroup, OverlayTrigger, Popover, ProgressBar, Row } from 'react-bootstrap';
import mywild from '../images/mywild.png';
import inat from '../images/inat_light.png';
import { doCalculateClick } from '../scripts/ProcessData';

export default function Header() {
    const popoverURL = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Available URL Parameters</Popover.Header>
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
        <Popover id="popover-basic">
            <Popover.Header as="h3">About Wild Achievements</Popover.Header>
            <Popover.Body>
                <Image src={mywild} className='App-logo' alt='MyWild' fluid />
                <hr />
                <Image src={inat} alt='iNaturalist' fluid />
            </Popover.Body>
        </Popover>
    );
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        if (isLoading) {
            networkRequest().then(() => {
                setLoading(false);
            });
        }
    }, [isLoading]);
    const handleClick = () => setLoading(true);
    return (
        <Container className="pt-3 p-4 bg-success bg-opacity-50 rounded-3">
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
                        <Col sm='auto'>
                            <OverlayTrigger trigger="click" placement="bottom" overlay={popoverURL}>
                                <Button variant="outline-secondary">
                                    URL Parameters
                                </Button>
                            </OverlayTrigger>
                        </Col>
                        <Col sm='auto'>
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
                            disabled={isLoading}
                            onClick={!isLoading ? handleClick : undefined}
                        >
                            {!isLoading ? 'Calculate Achievements' : 'Loading Achievements'}
                        </Button>
                    </InputGroup>
                </Row>
            </Container>
            <ProgressBar variant="success" now={0} />
            <br />
        </Container>
    );
}

function networkRequest() {
    console.log('networkRequest')
    // doCalculateClick();
    return new Promise((resolve) => setTimeout(resolve, 2000));
}
