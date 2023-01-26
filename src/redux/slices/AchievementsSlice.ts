import { createSlice } from '@reduxjs/toolkit';
import { AchievementActionType, AchievementDataType, AllAchievementsActionType } from '../../types/AchievementsTypes';

export const achievementsSlice = createSlice({
    name: 'achievements',
    initialState: {
        data: [] as AchievementDataType[]
    },
    reducers: {
        updateAchievementData: (state, action: AchievementActionType) => {
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].title === action.payload.title) {
                    state.data[i] = action.payload;
                    break;
                }
            }
        },
        setAllAchievementData: (state, action: AllAchievementsActionType) => {
            state.data = action.payload;
        }
    }
});

export const { updateAchievementData, setAllAchievementData } = achievementsSlice.actions;

export default achievementsSlice.reducer;
