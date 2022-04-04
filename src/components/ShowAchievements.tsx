import React, { memo } from 'react';
import { AchievementType } from '../types/iNatAchievementsTypes';
import AchievementCard from './AchievementCard';

export default memo(function ShowAchievements(list: AchievementType[]) {
    return (
        <div className="container">
            <div className="row">
                {list.map((listValue) => <AchievementCard
                                            icon={listValue.icon}
                                            title={listValue.title}
                                            details={listValue.details}
                                            goal={listValue.goal}
                                            count={listValue.count}
                                            color={listValue.color}
                                            key={"key" + listValue.title}
                                        />
                )}
            </div>
        </div>
    );
});

// Show the Achievements
// function showAchievements() {

//     // TODO: Maybe sort the list to show passed achievements first?

//     // Render all achievements listed in lstAchievementCardWrappers
//     // ReactDOM.render(
//     //         <AchievementCardListRender list={lstAchievementCardWrappers} />,
//     //         document.getElementById('achievementList'));
//     // Activate the new popovers
//     $(function () {
//         $('[data-toggle="popover"]').popover()
//     });
//     $('.popover-dismiss').popover({
//         trigger: 'focus'
//     });
// }
