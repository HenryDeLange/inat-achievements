import { createSlice } from '@reduxjs/toolkit';
import { AchievementType, ActionAchievementDataType, ActionAllAchievementDataType } from '../../types/AchievementsTypes';

export const achievementsSlice = createSlice({
    name: 'achievements',
    initialState: {
        data: [] as AchievementType[]
    },
    reducers: {
        updateAchievement: (state, action: ActionAchievementDataType) => {
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].title === action.payload.title) {
                    state.data[i] = action.payload;
                    break;
                }
            }
        },
        setAllAchievements: (state, action: ActionAllAchievementDataType) => {
            state.data = action.payload;
        }
    }
});

export const { updateAchievement, setAllAchievements } = achievementsSlice.actions;

export default achievementsSlice.reducer;
