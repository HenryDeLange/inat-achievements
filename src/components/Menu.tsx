import I18n from 'i18n-js';
import { ReactNode, useState } from 'react';
import { ButtonGroup, Col, Container, Image, Nav, Navbar, Offcanvas, OverlayTrigger, Popover, Row, ToggleButton } from 'react-bootstrap';
import { CodeSlash, Github, InfoCircle, Laptop, Moon, QuestionCircle, Sun } from 'react-bootstrap-icons';
import { OverlayChildren } from 'react-bootstrap/esm/Overlay';
import { useDispatch, useSelector } from 'react-redux';
import inat_dark from '../images/inat_dark.png';
import inat_light from '../images/inat_light.png';
import mywild from '../images/mywild.png';
import { RootState } from '../redux/ReduxStore';
import { toggleTheme } from '../redux/slices/AppSlice';
import { ThemeType } from '../types/AchievementsTypes';
import HyperLink from './HyperLink';

const iconSize = 18;

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
            {I18n.t('menuPopupRulesTitle')}
        </Popover.Header>
        <Popover.Body>
            {I18n.t('menuPopupRules')}
        </Popover.Body>
    </Popover>
);

export default function Menu() {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.app.mode);
    const [radioValue, setRadioValue] = useState<ThemeType>(theme);
    return (
        <Navbar className='p-0 pb-3 m-0 NavBar' expand='lg'>
            <Container fluid>
                <Navbar.Toggle className='bg-success' />
                <Navbar.Offcanvas placement='start' className='MenuDrawer'>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>{I18n.t('headerTitle')}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-start flex-grow-1 pe-">
                            <ButtonGroup size='sm'>
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
                                    <Sun size={iconSize} title={I18n.t('menuButtonLightTheme')} />
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
                                    <Moon size={iconSize} title={I18n.t('menuButtonDarkTheme')} style={{ marginTop: -2 }} />
                                </ToggleButton>
                            </ButtonGroup>
                            <NavPopup title={I18n.t('menuButtonAbout')} popup={popoverAbout}>
                                <InfoCircle size={iconSize} className='m-1' />
                            </NavPopup>
                            <NavPopup title={I18n.t('menuButtonRules')} popup={popoverRules}>
                                <QuestionCircle size={iconSize} className='m-1' />
                            </NavPopup>
                            <NavPopup title={I18n.t('menuButtonParams')} popup={popoverURL}>
                                <CodeSlash size={iconSize} className='m-1' />
                            </NavPopup>
                            <NavLink title={I18n.t('menuButtonGitHub')} url='https://github.com/HenryDeLange/inat-achievements'>
                                <Github size={iconSize} className='m-1' />
                            </NavLink>
                            <NavLink title={I18n.t('menuButtonDesktopApp')} url='https://github.com/HenryDeLange/inat-achievements/releases'>
                                <Laptop size={iconSize} className='m-1' />
                            </NavLink>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
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


type NavPopupType = {
    title: string;
    popup: OverlayChildren;
    children: ReactNode;
}
function NavPopup({ title, popup, children }: NavPopupType) {
    return (
        <OverlayTrigger
            trigger='click'
            placement='bottom'
            overlay={popup}
            rootClose
        >
            <div
                className='px-3 MenuDrawerItem'
                role='button'
                >
                {children}
                {title}
            </div>
        </OverlayTrigger>
    );
}

type NavLinkType = {
    title: string;
    url: string;
    children: ReactNode;
}
function NavLink({ title, url, children }: NavLinkType) {
    return (
        <a
            className='px-3 MenuDrawerItem'
            role='button'
            href={url}
            rel='noreferrer'
            target={(window as any).openLink ? '_self' : '_blank'}
            onClick={() => {
                if ((window as any).openLink) {
                    (window as any).openLink(url);
                }
            }}
        >
            {children}
            {title}
        </a>
    );
}
