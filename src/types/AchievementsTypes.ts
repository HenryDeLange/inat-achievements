import { Option } from 'react-bootstrap-typeahead/types/types';
import { Observation } from './iNaturalistTypes';

export declare type AchievementType = {
    icon: string;
    title: string;
    details: string;
    goal: number;
    count: number;
    getTaxa?: () => number[];
    evalFunc?: (iNatObsJSON: Observation) => number;
    resetFunc?: () => void;
    observations: number[];
}

export type ActionAchievementDataType = {
    payload: AchievementType;
}

export type ActionAllAchievementDataType = {
    payload: AchievementType[];
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
