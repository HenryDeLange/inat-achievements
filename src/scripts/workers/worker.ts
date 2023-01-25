import { AchievementDataType } from "../../types/AchievementsTypes";
import { Observation } from "../../types/iNaturalistTypes";
import AchievementWrapper from "../AchievementWrapper";
import AirLovers from './../achievements/AirLovers';
import AllCorners from './../achievements/AllCorners';
import AlwaysOn from './../achievements/AlwaysOn';
import CatchOfTheDay from './../achievements/CatchOfTheDay';
import CatsAndDogs from './../achievements/CatsAndDogs';
import CraneyStorker from './../achievements/CraneyStorker';
import DailyLife from './../achievements/DailyLife';
import DaisyTown from './../achievements/DaisyTown';
import EarlyBird from './../achievements/EarlyBird';
import EmployeeOfTheMonth from './../achievements/EmployeeOfTheMonth';
import FlowerChild from './../achievements/FlowerChild';
import ForeverSpring from './../achievements/ForeverSpring';
import HeartOfTheMatter from './../achievements/HeartOfTheMatter';
import HomelyHermit from './../achievements/HomelyHermit';
import KingFisher from './../achievements/KingFisher';
import LichenMoss from './../achievements/LichenMoss';
import LifeLister from './../achievements/LifeLister';
import Microcosm from './../achievements/Microcosm';
import NameGiver from './../achievements/NameGiver';
import NightOwl from './../achievements/NightOwl';
import NotABug from './../achievements/NotABug';
import NotSeeingIsBelieving from './../achievements/NotSeeingIsBelieving';
import OldGeeser from './../achievements/OldGeeser';
import PlentyOfPlaces from './../achievements/PlentyOfPlaces';
import RatKing from './../achievements/RatKing';
import Scatter from './../achievements/Scatter';
import SelfPollinator from './../achievements/SelfPollinator';
import SocialButterfly from './../achievements/SocialButterfly';
import Strider from './../achievements/Strider';
import SuperStar from './../achievements/SuperStar';
import TentacleSuckers from './../achievements/TentacleSuckers';
import ToadsAndToadstools from './../achievements/ToadsAndToadstools';
import TooManyBugs from './../achievements/TooManyBugs';
import TryMammals from './../achievements/TryMammals';
import WorldClass from './../achievements/WorldClass';

let lstAchievementWrapper: AchievementWrapper[] = [
    LifeLister,
    SelfPollinator,
    TryMammals,
    NightOwl,
    KingFisher,
    DaisyTown,
    HeartOfTheMatter,
    SocialButterfly,
    AirLovers,
    NameGiver,
    RatKing,
    CraneyStorker,
    TooManyBugs,
    NotABug,
    LichenMoss,
    ToadsAndToadstools,
// FIXME: The Taxa Cache doesn't work across the Web Worker (maybe also move that code in here?)
    // FlowerChild,
    // WorldClass,
    DailyLife,
    AlwaysOn,
    CatchOfTheDay,
    EarlyBird,
    TentacleSuckers,
    HomelyHermit,
    Microcosm,
    EmployeeOfTheMonth,
    Strider,
    ForeverSpring,
    NotSeeingIsBelieving,
    PlentyOfPlaces,
    AllCorners,
    CatsAndDogs,
    SuperStar,
    OldGeeser,
    Scatter
];

export async function reset() {
    console.log('>>>>>>>>>>>>>>>>>>> RESET: run in worker');
    for (let achievementWrapper of lstAchievementWrapper) {
        achievementWrapper.reset();
    }
    console.log('>>>>>>>>>>>>>>>>>>> RESET: done in worker');
    return lstAchievementWrapper.map(achievementWrapper => achievementWrapper.data);
}

export async function evaluate(observations: Observation[]): Promise<AchievementDataType[]> {
    console.log('>>>>>>>>>>>>>>>>>>> EVALUATE: run in worker');
    for (let achievementWrapper of lstAchievementWrapper) {
        for (let observation of observations) {
            achievementWrapper.evaluate(observation);
        }
    }
    console.log('>>>>>>>>>>>>>>>>>>> EVALUATE: done in worker')
    return lstAchievementWrapper.map(achievementWrapper => achievementWrapper.data);
}
