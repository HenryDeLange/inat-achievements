import React from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import Achievements from './components/Achievements';
import Header from './components/Header';
import Menu from './components/Menu';
import Progress from './components/Progress';
import Version from './components/Version';

export default function App() {
    return (
        <Container className='d-flex flex-column p-3 App' fluid>
            <Container className='pt-3 p-4 bg-success bg-opacity-50 rounded-3'>
                <Menu />
                <Header />
                <Progress />
                <Achievements />
            </Container>
            <Version />
        </Container>
    );
}
