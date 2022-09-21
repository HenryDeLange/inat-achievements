import { AchievementStatusType, AchievementType } from '../types/AchievementsTypes';
import { Observation } from '../types/iNaturalistTypes';

export default class AchievementData implements AchievementType {
    icon: string;
    title: string;
    details: string;
    status: AchievementStatusType;
    goal: number;
    count: number;
    iconColor: AchievementStatusType;
    textColor: string;
    evalFunc: (iNatObsJSON: Observation) => number | Promise<number>;
    resetFunc?: () => void;

    constructor(key: string, goal: number, evalFunc: (iNatObsJSON: Observation) => number | Promise<number>, resetFunc?: () => void) {
        this.icon = key;
        this.title = `achievement${key}Title`;
        this.details = `achievement${key}Details`;
        this.goal = goal;
        this.count = 0;
        this.evalFunc = evalFunc;
        this.resetFunc = resetFunc;
        this.status = this.calcStatus(this.count, this.goal);
        this.iconColor = this.calcIconColor(this.status);
        this.textColor = this.calcTextColor(this.status);
    }

    public evaluate(iNatObsJSON: Observation) {
        // Evaluate the Observation
        let result = this.evalFunc(iNatObsJSON);
        if (result instanceof Promise<number>) {
            console.log('get value from promise');
            const evalPromise = (result as Promise<number>);
            evalPromise
                .then(increment => {
                    console.log('increment by', increment);
                    this.updateCount(increment);
                });
        }
        else {
            this.updateCount(result);
        }
    }

    private updateCount(increment: number) {
        this.count = this.count + increment;
        // Update the status
        this.status = this.calcStatus(this.count, this.goal);
        this.iconColor = this.calcIconColor(this.status);
        this.textColor = this.calcTextColor(this.status);
    }

    // TODO: Add a mechanism to make sure once reset is called any in progress promises won't resolve and wont update the count
    public reset() {
        this.count = 0;
        if (this.resetFunc) {
            this.resetFunc();
        }
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
