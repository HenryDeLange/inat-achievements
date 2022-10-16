import I18n from 'i18n-js';
import { useState } from 'react';
import { ButtonGroup, Col, Container, Image, Nav, Navbar, OverlayTrigger, Popover, Row, ToggleButton } from 'react-bootstrap';
import { CodeSlash, Github, InfoCircle, Laptop, Moon, QuestionCircle, Sun } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import inat_dark from '../images/inat_dark.png';
import inat_light from '../images/inat_light.png';
import mywild from '../images/mywild.png';
import { RootState } from '../redux/ReduxStore';
import { toggleTheme } from '../redux/slices/AppSlice';
import { ThemeType } from '../types/AchievementsTypes';
import HyperLink from './HyperLink';

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

const popoverRules = (
    <Popover className='Popover'>
        <Popover.Header>
            {I18n.t('menuButtonRules')}
        </Popover.Header>
        <Popover.Body>
            {I18n.t('headerIntroRules')}
        </Popover.Body>
    </Popover>
);

export default function Menu() {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.app.mode);
    const [radioValue, setRadioValue] = useState<ThemeType>(theme);
    return (
        <Navbar className='p-0 pb-3 m-0' expand='lg'>
            <Container>
                <Navbar.Toggle aria-controls='navbar-toggle' className='bg-success' />
                <Navbar.Collapse id='navbar-toggle'>
                    <Nav className='me-auto'>
                        <OverlayTrigger trigger='click' placement='bottom' overlay={popoverAbout} rootClose>
                            <div role='button'>
                                <InfoCircle size={30} className='m-1' title={I18n.t('menuButtonAbout')} />
                                {I18n.t('menuButtonAbout')}
                            </div>
                        </OverlayTrigger>
                        <OverlayTrigger trigger='click' placement='bottom' overlay={popoverRules} rootClose>
                            <div role='button'>
                                <QuestionCircle size={30} className='m-1' title={I18n.t('menuButtonRules')} />
                                {I18n.t('menuButtonRules')}
                            </div>
                        </OverlayTrigger>
                        <OverlayTrigger trigger='click' placement='bottom' overlay={popoverURL} rootClose>
                            <div role='button'>
                                <CodeSlash size={30} className='m-1' title={I18n.t('menuButtonParams')} />
                                {I18n.t('menuButtonParams')}
                            </div>
                        </OverlayTrigger>
                        <OverlayTrigger trigger='click' placement='bottom' overlay={popoverURL} rootClose>
                            <a
                                role='button'
                                href='https://github.com/HenryDeLange/inat-achievements'
                                target={(window as any).openLink ? '_self' : '_blank'}
                                onClick={() => {
                                    if ((window as any).openLink) {
                                        (window as any).openLink('https://github.com/HenryDeLange/inat-achievements');
                                    }
                                }
                                }
                            >
                                <Github size={30} className='m-1' title={I18n.t('menuButtonGitHub')} />
                                {I18n.t('menuButtonGitHub')}
                            </a>
                        </OverlayTrigger>
                        <OverlayTrigger trigger='click' placement='bottom' overlay={popoverURL} rootClose>
                            <a
                                role='button'
                                href='https://github.com/HenryDeLange/inat-achievements/releases'
                                target={(window as any).openLink ? '_self' : '_blank'}
                                onClick={() => {
                                    if ((window as any).openLink) {
                                        (window as any).openLink('https://github.com/HenryDeLange/inat-achievements/releases');
                                    }
                                }
                                }
                            >
                                <Laptop size={30} className='m-1' title={I18n.t('menuButtonDesktopApp')} />
                                {I18n.t('menuButtonDesktopApp')}
                            </a>
                        </OverlayTrigger>

                        <ButtonGroup className='m-1'>
                            <ToggleButton
                                key='light'
                                id='light'
                                type='radio'
                                variant='light'
                                name='radio'
                                value='Light'
                                checked={radioValue === 'Light'}
                                onChange={(event) => {
                                    const theme = event.currentTarget.value as ThemeType;
                                    setRadioValue(theme);
                                    dispatch(toggleTheme(theme));
                                }}
                            >
                                <Sun size={24} title={I18n.t('menuButtonLightTheme')}  />
                            </ToggleButton>
                            <ToggleButton
                                key='dark'
                                id='dark'
                                type='radio'
                                variant='dark'
                                name='radio'
                                value='Dark'
                                checked={radioValue === 'Dark'}
                                onChange={(event) => {
                                    const theme = event.currentTarget.value as ThemeType;
                                    setRadioValue(theme);
                                    dispatch(toggleTheme(theme));
                                }}
                            >
                                <Moon size={24} title={I18n.t('menuButtonDarkTheme')} />
                            </ToggleButton>
                        </ButtonGroup>

                    </Nav>
                </Navbar.Collapse>
                <Navbar.Brand>
                    <HyperLink
                        linkContent={<Image src={theme === 'Light' ? inat_light : inat_dark} alt='iNaturalist' height={30} />}
                        linkURL='https://www.inaturalist.org'
                    />
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}
