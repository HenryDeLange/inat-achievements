import I18n from 'i18n-js';
import { AchievementStatusType, AchievementType } from '../types/AchievementsTypes';
import { Observation } from '../types/iNaturalistTypes';

export default class AchievementData implements AchievementType {
    icon: string;
    title: string;
    details: string;
    status: AchievementStatusType;
    goal: number;
    count: number;
    evalFunc: Function;
    iconColor: AchievementStatusType;
    textColor: string;

    constructor(key: string, goal: number, evalFunc: Function, count?: number) {
        this.icon = key;
        this.title = I18n.t(`achievement${key}Title`);
        this.details = I18n.t(`achievement${key}Details`, { goal });
        this.goal = goal;
        this.count = count ?? 0;
        this.evalFunc = evalFunc;
        this.status = this.calcStatus(this.count, this.goal);
        this.iconColor = this.calcIconColor(this.status);
        this.textColor = this.calcTextColor(this.status);
    }

    public evaluate(iNatObsJSON: Observation) {
        // Evaluate the Observation
        this.count = this.count + this.evalFunc(iNatObsJSON);
        // Update the status
        this.status = this.calcStatus(this.count, this.goal);
        this.iconColor = this.calcIconColor(this.status);
        this.textColor = this.calcTextColor(this.status);
    }

    private calcStatus(count: number, goal: number) {
        if (count >= goal) {
            return 'Success';
        }
        else if (count > (goal / 2)) {
            return 'Partial';
        }
        else if (count > 0) {
            return 'Started';
        }
        else {
            return 'Inactive';
        }
    }

    private calcIconColor(status: AchievementStatusType) {
        return status;
    }

    private calcTextColor(status: AchievementStatusType) {
        switch (status) {
            case 'Success':
                return 'Green';
            case 'Partial':
                return 'Green';
            case 'Started':
                return 'DarkOliveGreen';
            case 'Inactive':
                return 'grey';
            default:
                return 'red';
        }
    }

}
