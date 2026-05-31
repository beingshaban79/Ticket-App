import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

export const fetchProfile = createAsyncThunk(
  'profile/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/ops/conductor/profile.php');
      const data = response.data;
      if (!data.status) return rejectWithValue(data.message || 'Failed to load profile.');
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profile/update',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/ops/conductor/profile.php', payload);
      const data = response.data;
      if (!data.status) return rejectWithValue(data.message || 'Failed to update profile.');
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile:    null,
    isLoading:  false,
    isSaving:   false,
    error:      null,
    saveError:  null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.error     = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile   = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error     = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isSaving  = true;
        state.saveError = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isSaving = false;
        // Merge updated fields back into profile
        if (action.payload) state.profile = { ...state.profile, ...action.payload };
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isSaving  = false;
        state.saveError = action.payload;
      });
  },
});

export default profileSlice.reducer;
