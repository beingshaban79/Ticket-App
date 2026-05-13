import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

export const loginConductor = createAsyncThunk(
  'auth/loginConductor',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/conductor/login.php', credentials);
      const data = response.data;

      if (!data.status) {
        return rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user:            null,
    token:           null,
    isLoading:       false,
    isAuthenticated: false,
    error:           null,
  },
  reducers: {
    logout: (state) => {
      state.user            = null;
      state.token           = null;
      state.isAuthenticated = false;
      state.error           = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginConductor.pending, (state) => {
        state.isLoading = true;
        state.error     = null;
      })
      .addCase(loginConductor.fulfilled, (state, action) => {
        state.isLoading       = false;
        state.isAuthenticated = true;
        state.user            = action.payload;
        // Store whichever key the backend uses for the token
        state.token           = action.payload.token
                             || action.payload.access_token
                             || action.payload.jwt
                             || null;
        state.error           = null;
      })
      .addCase(loginConductor.rejected, (state, action) => {
        state.isLoading       = false;
        state.isAuthenticated = false;
        state.user            = null;
        state.token           = null;
        state.error           = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
