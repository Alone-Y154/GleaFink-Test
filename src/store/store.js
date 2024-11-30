import { configureStore } from '@reduxjs/toolkit';
import chartReducer from '../reducers/charts/barChart'; // Import the default export
import filtersReducer from '../reducers/filters/filters'; 
import authReducer from '../reducers/auth/auth';
// Handling redux slices for state management
export const store = configureStore({
  reducer: {
    chart: chartReducer,
    filters: filtersReducer,
    auth: authReducer
  },
});