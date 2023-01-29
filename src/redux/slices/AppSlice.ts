import { createSlice } from '@reduxjs/toolkit';
import { ActionThemeType, ThemeType } from '../../types/AchievementsTypes';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        mode: 'Dark' as ThemeType
    },
    reducers: {
        toggleTheme: (state, action: ActionThemeType) => {
            state.mode = action.payload;
        }
    }
});

export const { toggleTheme } = appSlice.actions;

export default appSlice.reducer;
