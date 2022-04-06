import { configureStore } from '@reduxjs/toolkit';
import achievementsReducer from './slices/AchievementsSlice';
import progressReducer from './slices/ProgressSlice';

const store = configureStore({
    reducer: {
        progress: progressReducer,
        achievements: achievementsReducer
    }
});
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
