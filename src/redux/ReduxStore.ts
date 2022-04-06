import { configureStore } from '@reduxjs/toolkit';
import progressReducer from './slices/ProgressSlice';

const store = configureStore({
    reducer: {
        progress: progressReducer
    }
});
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
