import { configureStore } from '@reduxjs/toolkit';
import achievementsReducer from './slices/AchievementsSlice';
import progressReducer from './slices/ProgressSlice';
import appReducer from './slices/AppSlice';

const store = configureStore({
    reducer: {
        app: appReducer,
        progress: progressReducer,
        achievements: achievementsReducer
    }
});
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
