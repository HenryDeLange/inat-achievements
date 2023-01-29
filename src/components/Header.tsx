import I18n from 'i18n-js';
import { Fragment, useState } from 'react';
import { Button, Container, Image, InputGroup, Row, Spinner, Stack } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { useDispatch, useSelector } from 'react-redux';
import icon from '../images/icon.png';
import { RootState } from '../redux/ReduxStore';
import { setProgressAlert, setProgressLoading, setProgressValue } from '../redux/slices/ProgressSlice';
import { calculateAchievements, resetAchievements } from '../scripts/ProcessData';
import { TypeaheadOptionType } from '../types/AchievementsTypes';
import { UserAutocompleteResponse } from '../types/iNaturalistTypes';
import HyperLink from './HyperLink';

let firstLoad = true;

export default function Header() {
    const queryParams = new URLSearchParams(window.location.search);
    // Loading
    const dispatch = useDispatch();
    const progressLoading = useSelector((state: RootState) => state.progress.loading);
    let taxonRanks = useSelector((state: RootState) => state.app.ranks);
    if (!taxonRanks)
        taxonRanks = [];
    // Username Input
    const urlUser = queryParams.get('user') ?? '';
    const [username, setUsername] = useState(urlUser);
    const [isUsernameLoading, setIsUsernameLoading] = useState(false);
    const [options, setOptions] = useState([] as TypeaheadOptionType[]);
    const handleSearch = (query: string) => {
        setIsUsernameLoading(true);
        // Not using inatjs module because at the moment it does not support the autocomplete
        fetch(`https://api.inaturalist.org/v1/users/autocomplete?q=${query}`, { headers: { 'User-Agent': 'wild-achievements' } })
            .then((response) => response.json())
            .then((userAutocompleteResponse: UserAutocompleteResponse) => {
                const newOptions = userAutocompleteResponse.results.map((user) => ({
                    id: user.id ?? 0,
                    login: user.login ?? (user.id ?? 'unknown').toString(),
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
        resetAchievements(dispatch);
        calculateAchievements(dispatch, taxonRanks, username, urlLimit);
    }
    if (firstLoad && urlUser) {
        firstLoad = false;
        handleClick();
    }

    const onKeyDown = (event: any) => {
        if (username && event.keyCode === 13) {
            handleClick();
        }
    }

    // Render
    return (
        <Container>
            <Row>
                <Container>
                    <Row className='p-1'>
                        <h1>
                            <b>{I18n.t('headerTitle')}</b>
                            <Image src={icon} className='Title-Image' />
                        </h1>
                    </Row>
                    <Row className='p-1'>
                        <h5>{I18n.t('headerIntro1')}</h5>
                        <h5>{I18n.t('headerIntro2')}</h5>
                        <h5>
                            {I18n.t('headerIntroINatStart')}
                            <HyperLink linkContent={I18n.t('iNaturalistWeb')} linkURL='https://www.inaturalist.org' />
                            {I18n.t('headerIntroINatEnd')}
                        </h5>
                    </Row>
                </Container>
            </Row>
            <Container className='p-3 pb-5 pt-5 p-md-5 rounded-5'>
                <Row>
                    <InputGroup size='lg'>
                        <AsyncTypeahead
                            id='username-search'
                            disabled={progressLoading}
                            filterBy={filterBy}
                            isLoading={isUsernameLoading}
                            isValid={username && username.trim().length > 0 ? true : false}
                            // isInvalid={!username || username.trim().length === 0 ? true : false}
                            labelKey='login'
                            minLength={3}
                            onSearch={handleSearch}
                            options={options}
                            placeholder={I18n.t('headerInput')}
                            defaultInputValue={username}
                            onChange={(selected) => setUsername(selected.map((option) => (option as TypeaheadOptionType).login)[0])}
                            // onInputChange={(text) => setUsername(text)}
                            onKeyDown={onKeyDown}
                            style={{ minWidth: 160 }}
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
                            <Stack direction="horizontal" gap={1}>
                                {progressLoading &&
                                    <Spinner animation='border' role='status' size='sm' className='m-1'>
                                        <span className='visually-hidden'>Loading...</span>
                                    </Spinner>
                                }
                                {!progressLoading ? I18n.t('headerCalculate') : I18n.t('headerLoading')}
                            </Stack>
                        </Button>
                    </InputGroup>
                </Row>
            </Container>
        </Container>
    );
}
