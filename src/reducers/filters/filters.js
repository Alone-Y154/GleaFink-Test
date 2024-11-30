import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        selectedRegions: [],
    },
    reducers: {
        setSelectedRegions(state, action) {
            state.selectedRegions = action.payload;
        },
        clearSelectedRegions(state) {
            state.selectedRegions = [];
        },
    },
});

// Export actions to be used in components
export const { setSelectedRegions, clearSelectedRegions } = filtersSlice.actions;

export default filtersSlice.reducer;
// Export the reducer to be included in the store