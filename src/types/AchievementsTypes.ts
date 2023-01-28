import { Option } from 'react-bootstrap-typeahead/types/types';

export type LogActionType = {
    payload: string;
}

export declare type AchievementDataType = {
    icon: string;
    title: string;
    details: string;
    goal: number;
    count: number;
    observations: number[];
}

export type AchievementActionType = {
    payload: AchievementDataType;
}

export type AllAchievementsActionType = {
    payload: AchievementDataType[];
}

export type TypeaheadOptionType = Option & {
    id: number;
    login: string;
    avatar_url?: string;
}

export declare type ThemeType =
    'Light' |
    'Dark';

export type ActionThemeType = {
    payload: ThemeType;
}

export type TaxonRankCacheType = {
    taxonID: number;
    rank: number;
}

export type ActionTaxonRankCacheType = {
    payload: TaxonRankCacheType;
}
