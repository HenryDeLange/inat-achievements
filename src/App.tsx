import React from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import Achievements from './components/Achievements';
import Header from './components/Header';
import Progress from './components/Progress';

// TODO: Add light/dark mode
// TODO: Add local caching of iNat observations (maybe the 'updated_since' search parameter can help with only fetching recent changes)
// TODO: Add i18n-js support
// TODO: Add a way to share the achievements (as a png?)

export default function App() {
    return (
        <Container className='d-flex flex-column p-3 App' fluid>
            <Container className='pt-3 p-4 bg-success bg-opacity-50 rounded-3'>
                <Header />
                <Progress />
                <Achievements />
            </Container>
        </Container>
    );
}
