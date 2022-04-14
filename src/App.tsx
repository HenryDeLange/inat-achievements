import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './App.css';
import Achievements from './components/Achievements';
import Header from './components/Header';
import Menu from './components/Menu';
import Progress from './components/Progress';
import Version from './components/Version';
import { RootState } from './redux/ReduxStore';

export default function App() {
    const theme = useSelector((state: RootState) => state.app.mode);
    return (
        <Container className={`d-flex flex-column p-3 App ${theme}`} fluid>
            <Container className='pt-3 p-4 bg-success bg-opacity-25 rounded-3'>
                <Menu />
                <Header />
                <Progress />
                <Achievements />
            </Container>
            <Version />
        </Container>
    );
}
