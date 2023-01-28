import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import achievementsReducer from './slices/AchievementsSlice';
import appReducer from './slices/AppSlice';
import progressReducer from './slices/ProgressSlice';

const reducers = combineReducers({
    app: appReducer,
    progress: progressReducer,
    achievements: achievementsReducer
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage: storage,
    whitelist: ['app'] // Only "app" will be persisted
}
const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
