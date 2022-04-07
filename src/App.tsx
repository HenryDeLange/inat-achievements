import React from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import Header from './components/Header';
import Progress from './components/Progress';
import Achievements from './components/Achievements';

// TODO: Add light/dark mode
// TODO: Add caching of iNat observations
// TODO: Add i18n-js support
// TODO: Add a way to share the achievements (as a png?)

export default function App() {
    return (
        <Container className='d-flex flex-column p-3 App' fluid>
            <Container className="pt-3 p-4 bg-success bg-opacity-50 rounded-3">
                <Header />
                <Progress />
                <Achievements />
            </Container>
        </Container>
    );
}
