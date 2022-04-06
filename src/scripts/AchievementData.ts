import { AchievementStatusType, AchievementType } from "../types/AchievementsTypes";
import { Observation } from "../types/iNaturalistTypes";

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

    constructor(title: string, details: string, icon: string, goal: number, evalFunc: Function, count?: number) {
        this.icon = icon;
        this.title = title;
        this.details = details;
        this.status = 'Fail';
        this.goal = goal;
        this.count = count ?? 0;
        this.evalFunc = evalFunc;
        this.iconColor = this.status;
        this.textColor = 'red';
        this.calcStatus();
        this.calcIconColor();
        this.calcTextColor();
    }

    public evaluate(iNatObsJSON: Observation) {
        // Evaluate the Observation
        this.count = this.count + this.evalFunc(iNatObsJSON);
        // Update the status
        this.calcStatus();
        this.calcIconColor();
        this.calcTextColor();
    }

    private calcStatus() {
        if (this.count >= this.goal) {
            this.status = 'Success';
        }
        else if (this.count > (this.goal / 2)) {
            this.status = 'Partial';
        }
        else {
            this.status = 'Inactive';
        }
    }

    private calcIconColor() {
        this.iconColor = this.status;
    }

    private calcTextColor() {
        switch (this.status) {
            case 'Success':
                this.textColor = 'green';
                break;
            case 'Partial':
                this.textColor = 'light-green';
                break;
            case 'Inactive':
                this.textColor = 'grey';
                break;
            default:
                this.textColor = 'red';
        }
    }

}
