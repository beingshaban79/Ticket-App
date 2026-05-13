import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

export const fetchRoutes = createAsyncThunk(
  'routes/fetchRoutes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/ops/route/list.php');
      const data = response.data;

      if (!data.status) {
        return rejectWithValue(data.message || 'Failed to load routes.');
      }

      return data.routes;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const routeSlice = createSlice({
  name: 'routes',
  initialState: {
    routes:    [],
    isLoading: false,
    error:     null,
  },
  reducers: {
    clearRouteError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoutes.pending, (state) => {
        state.isLoading = true;
        state.error     = null;
      })
      .addCase(fetchRoutes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.routes    = action.payload;
      })
      .addCase(fetchRoutes.rejected, (state, action) => {
        state.isLoading = false;
        state.error     = action.payload;
      });
  },
});

export const { clearRouteError } = routeSlice.actions;
export default routeSlice.reducer;
