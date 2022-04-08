import React from 'react';
import { Alert, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/ReduxStore';
import { setProgressAlert } from '../redux/slices/ProgressSlice';

export default function Progress() {
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.progress.loading);
    const value = useSelector((state: RootState) => state.progress.value);
    const alert = useSelector((state: RootState) => state.progress.alert);
    const message = useSelector((state: RootState) => state.progress.message);
    if (loading || alert) {
        return (
            <Container className='pb-5'>
                {loading &&
                    <Row className='pb-5'>
                        <Col className='w-75'>
                            <ProgressBar variant='success' now={value} />
                        </Col>
                    </Row>
                }
                {alert &&
                    <Row className='justify-content-center'>
                        <Alert
                            variant={value === 100 ? 'success' : 'secondary'}
                            className='w-50 Alert'
                            dismissible={!loading}
                            onClose={() => dispatch(setProgressAlert(false))}
                        >
                            {message}
                        </Alert>
                    </Row>
                }
            </Container>
        );
    }
    return null;
}
