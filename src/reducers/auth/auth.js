/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Login Thunk
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`, 
        userData
      );
      
      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      // Ensure bypass mode is set to false
      localStorage.setItem('bypassMode', 'false');
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Login failed');
    }
  }
);

// Signup Thunk
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/register`, 
        userData
      );
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Signup failed');
    }
  }
);

// Bypass Login Thunk
export const setBypassMode = createAsyncThunk(
    'auth/setBypassMode',
    async (_, { dispatch }) => {
      // Set bypass mode to true in localStorage
      localStorage.setItem('bypassMode', 'true');
      // Remove any existing token
      localStorage.removeItem('token');
      
      return { 
        user: { 
          role: 'bypass',
          name: 'Bypass User'
        } 
      };
    }
  );

  export const validateToken = createAsyncThunk(
    'auth/validateToken',
    async (_, { rejectWithValue, getState }) => {
      const state = getState();
      const bypass = state.auth.bypassMode; // Retrieve bypassMode from state
  
      // If bypassMode is true, skip token validation
      if (bypass) {
        console.log('Bypass Mode: true, skipping token validation');
        return { user: { name: 'Bypass User', role: 'bypass' }, token: null }; // Return mock user data for bypass mode
      }
  
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem('token');
        
        // If no token exists, reject
        if (!token) {
          return rejectWithValue('No token found');
        }
  
        // Send token validation request
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/auth/validate-token`, 
          { token }
        );
  
        // If token is valid, return user data
        if (response.data.authorized) {
          return {
            user: response.data.user,
            token: token
          };
        } else {
          // Token is invalid
          return rejectWithValue('Invalid token');
        }
      } catch (error) {
        // Clear token on validation failure
        localStorage.removeItem('token');
        return rejectWithValue(error.response?.data?.error || 'Token validation failed');
      }
    }
  );
  

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false,
    error: null,
    isAuthenticated: localStorage.getItem('bypassMode') === 'true',
    bypassMode: localStorage.getItem('bypassMode') === 'true',
    tokenValidationStatus: true
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.bypassMode = false;
      state.tokenValidationStatus = false;
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('bypassMode');
    }
  },
  extraReducers: (builder) => {
    // Login cases
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.tokenValidationStatus = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.bypassMode = false;
      state.tokenValidationStatus = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.tokenValidationStatus = false;
    });

    // Signup cases
    builder.addCase(signupUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.tokenValidationStatus = false;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = false;
      state.bypassMode = false;
      state.tokenValidationStatus = false;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.tokenValidationStatus = false;
    });

    // Token Validation cases
    builder.addCase(validateToken.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.tokenValidationStatus = false;
    });
    builder.addCase(validateToken.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.bypassMode = false;
      state.tokenValidationStatus = true;
    });
    builder.addCase(validateToken.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.bypassMode = false;
      state.tokenValidationStatus = false;
      
      // Ensure token is removed
      localStorage.removeItem('token');
    });
    
    // Bypass Login cases
    builder.addCase(setBypassMode.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = null;
        state.isAuthenticated = true;
        state.bypassMode = true;
        state.tokenValidationStatus = true;
        
        // Ensure localStorage is updated
        localStorage.setItem('bypassMode', 'true');
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;