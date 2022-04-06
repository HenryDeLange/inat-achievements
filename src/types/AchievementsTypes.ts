
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
