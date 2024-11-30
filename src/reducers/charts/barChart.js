import { createSlice } from '@reduxjs/toolkit';
import { salesData } from '../../miscellaneous/salesData';

const initialState = {
  salesData: salesData,
};

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setChartData: (state, action) => {
      state.salesData = action.payload;
    },
  },
});

export const { setChartData } = chartSlice.actions;

// This is the default export
export default chartSlice.reducer;