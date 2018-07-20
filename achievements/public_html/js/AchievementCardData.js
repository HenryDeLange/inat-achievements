class AchievementCardData {

    constructor(title, details, goal, icon, evalFunc) {
        this.title = title;
        this.details = details;
        this.goal = goal;
        this.count = 0;
        this.icon = icon;
        this.evalFunc = evalFunc;
    }
    
    evaluate(iNatObsJSON) {
        this.count = this.count + this.evalFunc(iNatObsJSON);
    }
    
}