import React, { memo } from 'react';
import { AchievementType } from '../types/iNatAchievementsTypes';

export default memo(function AchievementCard({
                                                icon = 'icon-template', 
                                                title = '..TEMPLATE..', 
                                                details = '???', 
                                                goal = 0, 
                                                count = 0, 
                                                color = 'red'
                                            }: AchievementType) {
    // TODO: Fix the alignment of the icons when using 'fontSize': '6rem'
    return (
        <div className='col-6 col-sm-4 col-md-3 col-lg-2'>
            <div className='card text-center border-0' style={{ 'margin': '2rem' }}>
                <a /*tabIndex='0'*/ 
                    data-toggle='popover'
                    data-trigger='focus'
                    className={icon + ' btn text-center'}
                    role='button'
                    data-placement='top'
                    style={{ 'color': color, 'fontSize': '5.25rem' }}
                    title='Achievement Details'
                    data-content={details} />
                <h6 className='card-title' style={{ 'color': color }}>
                    {title}
                </h6>
                <div className='card-text' style={{ 'color': color }}>
                    <small>{'(' + count + ' of ' + goal + ')'}</small>
                </div>
            </div>
        </div>
    );
});
