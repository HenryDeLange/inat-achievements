import { AchievementType } from '../types/AchievementsTypes';
import { Observation } from '../types/iNaturalistTypes';

export default class AchievementData implements AchievementType {
    icon: string;
    title: string;
    details: string;
    goal: number;
    count: number;
    getTaxa: () => number[];
    evalFunc: (iNatObsJSON: Observation) => number;
    resetFunc?: () => void;
    observations: number[] = [];

    constructor(key: string, goal: number, getTaxa: () => number[], evalFunc: (iNatObsJSON: Observation) => number, resetFunc?: () => void) {
        this.icon = key;
        this.title = `achievement${key}Title`;
        this.details = `achievement${key}Details`;
        this.goal = goal;
        this.count = 0;
        this.getTaxa = getTaxa;
        this.evalFunc = evalFunc;
        this.resetFunc = resetFunc;
        this.observations = [];
    }

    public evaluate(iNatObsJSON: Observation) {
        // Evaluate the Observation
        let result = this.evalFunc(iNatObsJSON);
        if (result > 0) {
            this.updateCount(iNatObsJSON.id ?? 0, result);
        }
    }

    private updateCount(observationID: number, increment: number) {
        this.count = this.count + increment;
        // Keep track of observations that increased the achievement
        this.observations = [ ...this.observations, observationID];
    }

    public reset() {
        this.count = 0;
        this.observations = [];
        if (this.resetFunc) {
            this.resetFunc();
        }
    }

}
