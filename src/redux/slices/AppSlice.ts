import { createSlice } from '@reduxjs/toolkit';
import { ActionThemeType, ThemeType } from '../../types/AchievementsTypes';

export const AppSlice = createSlice({
    name: 'app',
    initialState: {
        mode: 'Light' as ThemeType
    },
    reducers: {
        toggleTheme: (state, action: ActionThemeType) => {
            state.mode = action.payload;
        }
    }
});

export const { toggleTheme } = AppSlice.actions;

export default AppSlice.reducer;
