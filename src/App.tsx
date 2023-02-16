import { useRef } from 'react';
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
    const achievementsRef = useRef<any>();
    
    // Setup theme
    const theme = useSelector((state: RootState) => state.app.mode);
    // Render app
    return (
        <Container className={`d-flex flex-column p-3 App ${theme}`} fluid>
            <Menu achievementsRef={achievementsRef} />
            <Container ref={achievementsRef} className='pt-3 p-4 bg-success bg-opacity-25 rounded-3'>
                <Header />
                <Progress />
                <Achievements />
            </Container>
            <Version />
        </Container>
    );
}
