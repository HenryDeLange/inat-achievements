
export declare type AchievementType = {
    icon: string;
    title: string;
    details: string;
    status: AchievementStatusType;
    goal: number;
    count: number;
    iconColor: AchievementStatusType;
    textColor: string;
}

export declare type AchievementStatusType =
    'Success' |
    'Partial' |
    'Inactive' |
    'Fail';
