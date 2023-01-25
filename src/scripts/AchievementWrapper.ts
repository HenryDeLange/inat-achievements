import { AchievementDataType } from '../types/AchievementsTypes';
import { Observation } from '../types/iNaturalistTypes';

export default class AchievementWrapper {
    data: AchievementDataType;
    getTaxa: () => number[];
    private evalFunc: (iNatObsJSON: Observation) => number;
    private resetFunc?: () => void;
    
    constructor(key: string, goal: number, getTaxa: () => number[], evalFunc: (iNatObsJSON: Observation) => number, resetFunc?: () => void) {
        this.data = {
            icon: key,
            title: `achievement${key}Title`,
            details: `achievement${key}Details`,
            goal: goal,
            count: 0,
            observations: []
        }
        this.getTaxa = getTaxa;
        this.evalFunc = evalFunc;
        this.resetFunc = resetFunc;
    }

    public getData(): AchievementDataType {
        return this.data;
    }

    public evaluate(iNatObsJSON: Observation) {
        // Evaluate the Observation
        let result = this.evalFunc(iNatObsJSON);
        if (result > 0) {
            this.updateCount(iNatObsJSON.id ?? 0, result);
        }
    }

    private updateCount(observationID: number, increment: number) {
        this.data.count = this.data.count + increment;
        // Keep track of observations that increased the achievement
        this.data.observations.push(observationID);
    }

    public reset() {
        this.data.count = 0;
        this.data.observations = [];
        if (this.resetFunc) {
            this.resetFunc();
        }
    }

}
