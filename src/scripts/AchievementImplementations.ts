import { AchievementType } from '../types/AchievementsTypes';
import AchievementData from './AchievementData';
import AllCorners from './achievements/AllCorners';
import AlwaysOn from './achievements/AlwaysOn';
import CatchOfTheDay from './achievements/CatchOfTheDay';
import CatsAndDogs from './achievements/CatsAndDogs';
import CraneyStorker from './achievements/CraneyStorker';
import DailyLife from './achievements/DailyLife';
import DaisyTown from './achievements/DaisyTown';
import EarlyBird from './achievements/EarlyBird';
import EmployeeOfTheMonth from './achievements/EmployeeOfTheMonth';
import FlowerChild from './achievements/FlowerChild';
import ForeverSpring from './achievements/ForeverSpring';
import AirLovers from './achievements/AirLovers';
import HeartOfTheMatter from './achievements/HeartOfTheMatter';
import HomelyHermit from './achievements/HomelyHermit';
import KingFisher from './achievements/KingFisher';
import LichenMoss from './achievements/LichenMoss';
import LifeLister from './achievements/LifeLister';
import NameGiver from './achievements/NameGiver';
import NightOwl from './achievements/NightOwl';
import NotABug from './achievements/NotABug';
import NotSeeingIsBelieving from './achievements/NotSeeingIsBelieving';
import OldGeeser from './achievements/OldGeeser';
import PlentyOfPlaces from './achievements/PlentyOfPlaces';
import RatKing from './achievements/RatKing';
import Scatter from './achievements/Scatter';
import SelfPollinator from './achievements/SelfPollinator';
import Microcosm from './achievements/Microcosm';
import SocialButterfly from './achievements/SocialButterfly';
import Strider from './achievements/Strider';
import SuperStar from './achievements/SuperStar';
import TentacleSuckers from './achievements/TentacleSuckers';
import ToadsAndToadstools from './achievements/ToadsAndToadstools';
import TooManyBugs from './achievements/TooManyBugs';
import TryMammals from './achievements/TryMammals';
import WorldClass from './achievements/WorldClass';

let lstAchievementCardWrappers: AchievementData[] = [];

export function getAchievements(): AchievementData[] {
    return lstAchievementCardWrappers;
}

export function getAchievementsAsType(): AchievementType[] {
    const list = [];
    for (let achievementData of lstAchievementCardWrappers) {
        const temp = { ...achievementData, evalFunc: undefined, resetFunc: undefined };
        list.push(temp);
    }
    return list;
}

export function resetAchievements() {
    lstAchievementCardWrappers.forEach((achievement) => achievement.reset());
}

export function initAchievements() {
    lstAchievementCardWrappers = [
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
        FlowerChild,
        WorldClass,
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
}
