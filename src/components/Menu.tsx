import I18n from 'i18n-js';
import React, { useState } from 'react';
import { ButtonGroup, Col, Container, Image, Nav, Navbar, Popover, Row, ToggleButton } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import inat_dark from '../images/inat_dark.png';
import inat_light from '../images/inat_light.png';
import mywild from '../images/mywild.png';
import { toggleTheme } from '../redux/slices/AppSlice';
import { ThemeToggleType, ThemeType } from '../types/AchievementsTypes';
import HyperLink from './HyperLink';
import MenuButton from './MenuButton';

export default function Menu() {
    const dispatch = useDispatch();
    const [radioValue, setRadioValue] = useState<ThemeType>('Light');
    const radios: ThemeToggleType[] = [
        { name: 'Light Mode', value: 'Light' },
        { name: 'Dark Mode', value: 'Dark' }
    ];

    const popoverURL = (
        <Popover className='Popover'>
            <Popover.Header>
                {I18n.t('menuPopupParamsTitle')}
            </Popover.Header>
            <Popover.Body>
                <b>user</b><br />{I18n.t('menuPopupParamsUser')}
                <hr />
                <b>limit</b><br />{I18n.t('menuPopupParamsLimit')}
                <hr />
                {I18n.t('menuPopupParamsExample') + ' https://wild-achievements.mywild.co.za?user=henrydelange&limit=100'}
            </Popover.Body>
        </Popover>
    );

    const popoverAbout = (
        <Popover className='Popover'>
            <Popover.Header>
                {I18n.t('menuPopupAboutTitle')}
            </Popover.Header>
            <Popover.Body>
                <Container>
                    <Row>
                        <Col sm='auto'>
                            <Image src={mywild} alt='MyWild' className='Image-MyWild' fluid />
                        </Col>
                        <Col>
                            <h5>{I18n.t('myWild')}</h5>
                            <h6>{I18n.t('menuPopupAboutMyWildHeading')}</h6>
                            <p>
                                {I18n.t('menuPopupAboutMyWildTextStart')}
                                <HyperLink linkContent={'henry@mywild.co.za'} linkURL='mailto:henry@mywild.co.za' />
                                {I18n.t('menuPopupAboutMyWildTextEnd')}
                            </p>
                            <p><i>{I18n.t('menuPopupAboutMyWildDisclaimer')}</i></p>
                        </Col>
                    </Row>
                </Container>
                <hr />
                <Container>
                    <Image src={inat_light} alt='iNaturalist' className='Image-iNat' />
                    <h6 style={{ marginTop: 15 }}>
                        {I18n.t('menuPopupAboutINaturalistTextStart')}
                        <HyperLink linkContent={I18n.t('iNaturalistAPI')} linkURL='https://api.inaturalist.org/v1/docs' />
                        {I18n.t('menuPopupAboutINaturalistTextEnd')}
                    </h6>
                </Container>
            </Popover.Body>
        </Popover>
    );

    return (
        <Navbar className='p-0 pb-3 m-0' expand='lg'>
            <Container>
                <Navbar.Toggle aria-controls='navbar-toggle' className='bg-success' />
                <Navbar.Collapse id='navbar-toggle'>
                    <Nav className='me-auto'>
                        <MenuButton buttonContent={I18n.t('menuButtonAbout')} popupComponent={popoverAbout} />
                        <MenuButton buttonContent={I18n.t('menuButtonParams')} popupComponent={popoverURL} />
                        <MenuButton buttonContent={I18n.t('menuButtonGitHub')} linkURL='https://github.com/HenryDeLange/inat-achievements' />
                        <MenuButton buttonContent={I18n.t('menuButtonDesktopApp')} linkURL='https://github.com/HenryDeLange/inat-achievements/releases' />
                        <MenuButton buttonContent={I18n.t('menuButtonMobileApp')} linkURL='https://github.com/HenryDeLange/inat-achievements/releases' />
                        <ButtonGroup className='m-1'>
                            {radios.map((radio, idx) => (
                                <ToggleButton
                                    key={idx}
                                    id={`radio-${idx}`}
                                    type='radio'
                                    variant={'success'}
                                    className={radioValue === radio.value ? 'bg-success' : 'bg-secondary'}
                                    name='radio'
                                    value={radio.value}
                                    checked={radioValue === radio.value}
                                    onChange={(event) => {
                                        const theme = event.currentTarget.value as ThemeType;
                                        setRadioValue(theme);
                                        dispatch(toggleTheme(theme));
                                    }}
                                >
                                    {radio.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Brand>
                    <HyperLink linkContent={<Image src={inat_dark} alt='iNaturalist' height={30} />} linkURL='https://www.inaturalist.org' />
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}
