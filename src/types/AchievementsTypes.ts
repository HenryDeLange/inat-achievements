import { Option } from "react-bootstrap-typeahead/types/types";

export declare type AchievementType = {
    icon: string;
    title: string;
    details: string;
    status: AchievementStatusType;
    goal: number;
    count: number;
    iconColor: AchievementStatusType;
    textColor: string;
    evalFunc: Function | undefined;
}

export declare type AchievementStatusType =
    'Success' |
    'Partial' |
    'Inactive' |
    'Fail';

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
