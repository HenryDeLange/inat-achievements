import React from 'react';
import { Button, Col, Container, Image, Nav, Navbar, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import inat_dark from '../images/inat_dark.png';
import inat_light from '../images/inat_light.png';
import mywild from '../images/mywild.png';

const popoverURL = (
    <Popover className='Popover'>
        <Popover.Header>
            Available URL Parameters
        </Popover.Header>
        <Popover.Body>
            <b>user</b>
            <br />
            Immediately load the achievements for the specified user.
            <hr />
            <b>limit</b>
            <br />
            The maximum number of observations that should be fetched from iNaturalist.
            <hr />
            Example:{' https://wild-achievements.mywild.co.za?user=henrydelange&limit=100'}
        </Popover.Body>
    </Popover>
);

const popoverAbout = (
    <Popover className='Popover'>
        <Popover.Header>
            About Wild Achievements
        </Popover.Header>
        <Popover.Body>
            <Container>
                <Row>
                    <Col sm='auto'>
                        <Image src={mywild} alt='MyWild' className='Image-MyWild' fluid />
                    </Col>
                    <Col>
                        <h5>MyWild</h5>
                        <h6>Developed by MyWild (Henry de Lange).</h6>
                        <p>
                            For any feedback you are welcome to log an issue on GitHub, or email me directly at
                            <a
                                href='mailto:henry@mywild.co.za'
                                rel='noreferrer'
                                target={(window as any).openLink ? '_self' : '_blank'}
                                onClick={() => {
                                    if ((window as any).openLink) {
                                        (window as any).openLink('mailto:henry@mywild.co.za');
                                    }
                                }}
                            >
                                {' henry@mywild.co.za'}
                            </a>
                            .
                        </p>
                        <p><i>Note that this is not an officially iNaturalist website.</i></p>
                    </Col>
                </Row>
            </Container>
            <hr />
            <Container>
                <Image src={inat_light} alt='iNaturalist' className='Image-iNat' />
                <h6 style={{ marginTop: 15 }}>
                    This website is powered by the
                    <a
                        href='https://api.inaturalist.org/v1/docs'
                        rel='noreferrer'
                        target={(window as any).openLink ? '_self' : '_blank'}
                        onClick={() => {
                            if ((window as any).openLink) {
                                (window as any).openLink('https://api.inaturalist.org/v1/docs');
                            }
                        }}
                    >
                        {' iNaturalist API'}
                    </a>
                    .
                </h6>
            </Container>
        </Popover.Body>
    </Popover>
);

export default function Menu() {
    return (
        <Container className='m-0 p-0'>
            <Row>
                <Col className='p-0 m-0' sm='auto'>
                    <Navbar expand='lg'>
                        <Container>
                            <Navbar.Brand>
                                <a
                                    href='https://www.inaturalist.org'
                                    rel='noreferrer'
                                    target={(window as any).openLink ? '_self' : '_blank'}
                                    onClick={() => {
                                        if ((window as any).openLink) {
                                            (window as any).openLink('https://www.inaturalist.org');
                                        }
                                    }}
                                >
                                    <Image src={inat_dark} alt='iNaturalist' height={30} />
                                </a>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls='navbar-toggle' className='bg-success' />
                            <Navbar.Collapse id='navbar-toggle'>
                                <Nav className='me-auto'>
                                    <OverlayTrigger trigger='click' placement='bottom' overlay={popoverAbout} rootClose>
                                        <Button className='m-1' variant='success'>
                                            About
                                        </Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger trigger='click' placement='bottom' overlay={popoverURL} rootClose>
                                        <Button className='m-1' variant='success'>
                                            URL Parameters
                                        </Button>
                                    </OverlayTrigger>
                                    <Button
                                        variant='success'
                                        className='m-1'
                                        href='https://github.com/HenryDeLange/inat-achievements'
                                        target={(window as any).openLink ? '_self' : '_blank'}
                                        onClick={() => {
                                            if ((window as any).openLink) {
                                                (window as any).openLink('https://github.com/HenryDeLange/inat-achievements');
                                            }
                                        }}
                                    >
                                        GitHub Code
                                    </Button>
                                    <Button
                                        variant='success'
                                        className='m-1'
                                        href='https://github.com/HenryDeLange/inat-achievements/releases'
                                        target={(window as any).openLink ? '_self' : '_blank'}
                                        onClick={() => {
                                            if ((window as any).openLink) {
                                                (window as any).openLink('https://github.com/HenryDeLange/inat-achievements/releases');
                                            }
                                        }}
                                    >
                                        Desktop App
                                    </Button>
                                    <Button
                                        variant='success'
                                        className='m-1'
                                        href='https://github.com/HenryDeLange/inat-achievements/releases'
                                        target={(window as any).openLink ? '_self' : '_blank'}
                                        onClick={() => {
                                            if ((window as any).openLink) {
                                                (window as any).openLink('https://github.com/HenryDeLange/inat-achievements/releases');
                                            }
                                        }}
                                    >
                                        Mobile App
                                    </Button>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </Col>
            </Row>
        </Container>
    );
}
