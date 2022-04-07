import React, { Fragment, useState } from 'react';
import { Button, Col, Container, Image, InputGroup, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { useDispatch, useSelector } from 'react-redux';
import inat_light from '../images/inat_light.png';
import inat_dark from '../images/inat_dark.png';
import mywild from '../images/mywild.png';
import { RootState } from '../redux/ReduxStore';
import { setAllAchievements, updateAchievement } from '../redux/slices/AchievementsSlice';
import { setProgressLoading, setProgressValue } from '../redux/slices/ProgressSlice';
import { clearAchievements, getAchievements, getAchievementsAsType, initAchievements } from '../scripts/AchievementImplementations';
import { calculateAchievements } from '../scripts/ProcessData';
import { TypeaheadOptionType } from '../types/AchievementsTypes';
import { UserAutocompleteResponse } from '../types/iNaturalistTypes';

export default function Header() {
    // Loading
    const dispatch = useDispatch();
    const progressLoading = useSelector((state: RootState) => state.progress.loading);

    // Username Input
    const [username, setUsername] = useState('');
    const [isUsernameLoading, setIsUsernameLoading] = useState(false);
    const [options, setOptions] = useState([] as TypeaheadOptionType[]);
    const handleSearch = (query: string) => {
        setIsUsernameLoading(true);
        // Not using inatjs module because at the moment it does not support the autocomplete
        fetch(`https://api.inaturalist.org/v1/users/autocomplete?q=${query}`)
            .then((response) => response.json())
            .then((userAutocompleteResponse: UserAutocompleteResponse) => {
                const options = userAutocompleteResponse.results.map((user) => ({
                    id: user.id,
                    login: user.login ?? user.id.toString(),
                    avatar_url: user.icon_url ?? require('../images/inat_empty.png')
                }));
                setOptions(options);
                setIsUsernameLoading(false);
            });
    };
    const filterBy = () => true; // Bypass client-side filtering by returning `true`. Results are already filtered by the search endpoint, so no need to do it again.

    // Calculate Button
    const handleClick = () => {
        dispatch(setProgressValue(0));
        dispatch(setProgressLoading(true));
        clearAchievements();
        initAchievements();
        dispatch(setAllAchievements(getAchievementsAsType()));
        calculateAchievements(dispatch, username, (observation) => {
            for (let achievementData of getAchievements()) {
                achievementData.evaluate(observation);
                dispatch(updateAchievement({ ...achievementData, evalFunc: undefined }));
            }
        });
    }

    // Popups
    const popoverURL = (
        <Popover>
            <Popover.Header as='h3'>
                Available URL Parameters
            </Popover.Header>
            <Popover.Body>
                <b>user=username</b>
                <br />
                Immediately load the achievements for the specified user.
                <hr />
                <b>limit=100</b>
                <br />
                Limit the number of observations that are read.
            </Popover.Body>
        </Popover>
    );
    // TODO: Make this popover resize differently for large vs small screens
    const popoverAbout = (
        <Popover className='Popover-About'>
            <Popover.Header as='h3'>
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
                            <p>This is not an officially iNaturalist website.</p>
                        </Col>
                    </Row>
                </Container>
                <hr />
                <Container>
                    <Image src={inat_light} alt='iNaturalist' className='Image-iNat' style={{ marginBottom: 15 }} />
                    <h6>This website is powered by the <a href='https://api.inaturalist.org/v1/docs'>iNaturalist API</a>.</h6>
                </Container>
            </Popover.Body>
        </Popover>
    );

    // Render
    return (
        <Container>
            <Row>
                <Container className='pt-3 pb-3 bg-success bg-opacity-10 rounded-3'>
                    <Row className='p-3'>
                        <h1><b>Wild Achievements</b></h1>
                    </Row>
                    <Row className='p-3'>
                        <h5>The goal of Wild Achievements is to enhance your iNaturalist experience.
                            Your iNaturalist observations are analyzed and counted towards progressing the various fun achievements.</h5>
                        <h6>Upload more observations on <a href='https://www.inaturalist.org'>iNaturalist.org</a> to try and unlock all achievements!</h6>
                    </Row>
                    <Row className='p-1'>
                        <Col />
                        <Col sm='auto' className='p-1'>
                            <Button variant='outline-secondary'>
                                Android App
                            </Button>
                        </Col>
                        <Col sm='auto' className='p-1'>
                            <Button variant='outline-secondary'>
                                Windows App
                            </Button>
                        </Col>
                        <Col />
                        <Col sm='auto' className='p-1'>
                            <OverlayTrigger trigger='click' placement='bottom' overlay={popoverURL} rootClose>
                                <Button variant='outline-secondary'>
                                    URL Parameters
                                </Button>
                            </OverlayTrigger>
                        </Col>
                        <Col />
                        <Col sm='auto' className='p-1'>
                            <OverlayTrigger trigger='click' placement='bottom' overlay={popoverAbout} rootClose>
                                <Button variant='outline-secondary'>
                                    About
                                </Button>
                            </OverlayTrigger>
                        </Col>
                        <Col sm='auto' className='p-1'>
                            <Button variant='outline-secondary' href='https://github.com/HenryDeLange/inat-achievements'>
                                GitHub
                            </Button>
                        </Col>
                        <Col />
                        <Col sm='auto' className='p-1'>
                            <a href='https://www.inaturalist.org'>
                                <Image src={inat_dark} alt='iNaturalist' height={25} />
                            </a>
                        </Col>
                    </Row>
                </Container>
            </Row>
            <Container className='p-5 rounded-5'>
                <Row>
                    <InputGroup size='lg'>
                        <AsyncTypeahead
                            id='username-search'
                            filterBy={filterBy}
                            isLoading={isUsernameLoading}
                            isValid={username && username.trim().length > 0 ? true : false}
                            // isInvalid={!username || username.trim().length === 0 ? true : false}
                            labelKey='login'
                            minLength={3}
                            onSearch={handleSearch}
                            options={options}
                            placeholder='iNaturalist Username'
                            defaultInputValue={username}
                            onChange={(selected) => setUsername(selected.map((option) => (option as TypeaheadOptionType).login)[0])}
                            // onInputChange={(text) => setUsername(text)}
                            renderMenuItemChildren={(option, props) => (
                                <Fragment>
                                    <Image
                                        src={(option as TypeaheadOptionType).avatar_url}
                                        style={{
                                            height: '24px',
                                            marginRight: '10px',
                                            width: '24px',
                                        }}
                                    />
                                    {(option as TypeaheadOptionType).login}
                                </Fragment>
                            )}
                        />
                        <Button
                            variant={!username ? 'secondary' : progressLoading ? 'secondary' : 'success'}
                            disabled={progressLoading || !username}
                            onClick={!progressLoading ? handleClick : undefined}
                        >
                            {!progressLoading ? 'Calculate Achievements' : 'Loading Achievements'}
                        </Button>
                    </InputGroup>
                </Row>
            </Container>
        </Container>
    );
}
