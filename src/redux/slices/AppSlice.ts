import { createSlice } from '@reduxjs/toolkit';
import { ActionTaxonRankCacheType, ActionThemeType, TaxonRankCacheType, ThemeType } from '../../types/AchievementsTypes';

export const AppSlice = createSlice({
    name: 'app',
    initialState: {
        mode: 'Dark' as ThemeType,
        ranks: [] as TaxonRankCacheType[]
    },
    reducers: {
        toggleTheme: (state, action: ActionThemeType) => {
            state.mode = action.payload;
        },
        populateTaxonRankCache: (state, action: ActionTaxonRankCacheType) => {
            if (!state.ranks) {
                state.ranks = [];
            }
            else {
                const index = state.ranks.findIndex(cache => cache.taxonID === action.payload.taxonID);
                if (index >= 0) {
                    state.ranks = [
                        ...state.ranks.slice(0, index),
                        action.payload,
                        ...state.ranks.slice(index + 1)
                    ]
                }
                else {
                    state.ranks = [ ...state.ranks, action.payload ];
                }
            }
        }
    }
});

export const { toggleTheme, populateTaxonRankCache } = AppSlice.actions;

export default AppSlice.reducer;
