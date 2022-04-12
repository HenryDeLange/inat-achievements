import I18n from 'i18n-js';
import React, { Fragment, useState } from 'react';
import { Button, Container, Image, InputGroup, Row } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/ReduxStore';
import { setAllAchievements, updateAchievement } from '../redux/slices/AchievementsSlice';
import { setProgressAlert, setProgressLoading, setProgressValue } from '../redux/slices/ProgressSlice';
import { clearAchievements, getAchievements, getAchievementsAsType, initAchievements } from '../scripts/AchievementImplementations';
import { calculateAchievements } from '../scripts/ProcessData';
import { TypeaheadOptionType } from '../types/AchievementsTypes';
import { UserAutocompleteResponse } from '../types/iNaturalistTypes';
import HyperLink from './HyperLink';

let firstLoad = true;

export default function Header() {
    const queryParams = new URLSearchParams(window.location.search);

    // Loading
    const dispatch = useDispatch();
    const progressLoading = useSelector((state: RootState) => state.progress.loading);

    // Username Input
    const urlUser = queryParams.get('user') ?? '';
    const [username, setUsername] = useState(urlUser);
    const [isUsernameLoading, setIsUsernameLoading] = useState(false);
    const [options, setOptions] = useState([] as TypeaheadOptionType[]);
    const handleSearch = (query: string) => {
        setIsUsernameLoading(true);
        // Not using inatjs module because at the moment it does not support the autocomplete
        fetch(`https://api.inaturalist.org/v1/users/autocomplete?q=${query}`)
            .then((response) => response.json())
            .then((userAutocompleteResponse: UserAutocompleteResponse) => {
                const newOptions = userAutocompleteResponse.results.map((user) => ({
                    id: user.id,
                    login: user.login ?? user.id.toString(),
                    avatar_url: user.icon_url ?? require('../images/inat_empty.png')
                }));
                setOptions(newOptions);
                setIsUsernameLoading(false);
            });
    };
    const filterBy = () => true; // Bypass client-side filtering by returning `true`. Results are already filtered by the search endpoint, so no need to do it again.

    // Calculate Button
    const urlLimit = Number(queryParams.get('limit'));
    const handleClick = () => {
        dispatch(setProgressValue(0));
        dispatch(setProgressLoading(true));
        dispatch(setProgressAlert(true));
        clearAchievements();
        initAchievements();
        dispatch(setAllAchievements(getAchievementsAsType()));
        calculateAchievements(dispatch, username, (observation) => {
            for (let achievementData of getAchievements()) {
                achievementData.evaluate(observation);
                dispatch(updateAchievement({ ...achievementData, evalFunc: undefined }));
            }
        }, urlLimit > 0 ? urlLimit : undefined);
    }
    if (firstLoad && urlUser) {
        firstLoad = false;
        handleClick();
    }

    // Render
    return (
        <Container>
            <Row>
                <Container className='p-1 bg-success bg-opacity-10 rounded-3'>
                    <Row className='p-1'>
                        <h1><b>{I18n.t('headerTitle')}</b></h1>
                    </Row>
                    <Row className='p-1'>
                        <h5>{I18n.t('headerIntro')}</h5>
                        <h5>
                            {I18n.t('headerIntroINatStart')}
                            <HyperLink linkContent={I18n.t('iNaturalistWeb')} linkURL='https://www.inaturalist.org' />
                            {I18n.t('headerIntroINatEnd')}
                        </h5>
                        <h6>{I18n.t('headerIntroRules')}</h6>
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
                            renderMenuItemChildren={(option) => (
                                <Fragment>
                                    <Image
                                        src={(option as TypeaheadOptionType).avatar_url}
                                        style={{
                                            height: '24px',
                                            width: '24px',
                                        }}
                                    />
                                    {' ' + (option as TypeaheadOptionType).login}
                                </Fragment>
                            )}
                        />
                        <Button
                            variant={!username ? 'secondary' : progressLoading ? 'secondary' : 'success'}
                            disabled={progressLoading || !username}
                            onClick={!progressLoading ? handleClick : undefined}
                        >
                            {!progressLoading ? I18n.t('headerCalculate') : I18n.t('headerLoading')}
                        </Button>
                    </InputGroup>
                </Row>
            </Container>
        </Container>
    );
}
