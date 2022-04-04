import { AchievementType } from "../types/iNatAchievementsTypes";
import { Observation } from "../types/iNaturalistTypes";

export default class AchievementCardData implements AchievementType {
    title: string;
    details: string;
    goal: number;
    icon: string;
    count: number;
    evalFunc: Function;

    constructor(title: string, details: string, goal: number, icon: string, evalFunc: Function) {
        this.title = title;
        this.details = details;
        this.goal = goal;
        this.count = 0;
        this.icon = icon;
        this.evalFunc = evalFunc;
    }
    
    evaluate(iNatObsJSON: Observation) {
        this.count = this.count + this.evalFunc(iNatObsJSON);
    }
    
    get color() {
        if (this.count >= this.goal) {
            return "#33AA33";
        }
        return "#AFB9AF";
    }
    
}
