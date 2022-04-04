import React from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import Header from './components/Header';

export default function App() {
    return (
        <Container className='vh-100 d-flex flex-column p-3 App' fluid>
            <Header />
        </Container>
    );
}
