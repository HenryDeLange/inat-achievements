import React, { useState } from 'react';
import { Alert, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/ReduxStore';

export default function Progress() {
    const [show, setShow] = useState(true);
    const progressLoading = useSelector((state: RootState) => state.progress.loading);
    const progressValue = useSelector((state: RootState) => state.progress.value);
    if (progressLoading) {
        return (
            <Container className='pb-5'>
                <Row>
                    <Col className='w-75'>
                        <ProgressBar variant="success" now={progressValue} />
                    </Col>
                </Row>
                <Row className='justify-content-center'>
                    <Alert variant='secondary' className='w-50 Alert' dismissible show={show} onClose={() => setShow(false)}>
                        Read X records
                    </Alert>
                </Row>
            </Container>
        );
    }
    return null;
}
