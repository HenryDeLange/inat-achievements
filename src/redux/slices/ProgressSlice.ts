import { createSlice } from '@reduxjs/toolkit'

export const progressSlice = createSlice({
    name: 'progress',
    initialState: {
        loading: false,
        value: 0
    },
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    reducers: {
        setProgressValue: (state, action) => {
            state.value = action.payload;
        },
        setProgressLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { setProgressValue, setProgressLoading } = progressSlice.actions;

export default progressSlice.reducer;
