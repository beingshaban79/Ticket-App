import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

export const fetchRouteDetails = createAsyncThunk(
  'routeDetails/fetch',
  async (routeId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/ops/route/details.php', {
        params: { route_id: routeId },
      });
      const data = response.data;

      if (!data.status) {
        return rejectWithValue(data.message || 'Failed to load route details.');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const startTrip = createAsyncThunk(
  'routeDetails/startTrip',
  async ({ routeId, direction }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/ops/route/details.php', {
        action:    'start_trip',
        route_id:  routeId,
        direction,
      });
      const data = response.data;

      if (!data.status) {
        return rejectWithValue(data.message || 'Failed to start trip.');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const routeDetailsSlice = createSlice({
  name: 'routeDetails',
  initialState: {
    details:        null,
    isLoading:      false,
    error:          null,
    isStarting:     false,
    startError:     null,
  },
  reducers: {
    clearRouteDetails: (state) => {
      state.details    = null;
      state.error      = null;
      state.isLoading  = false;
      state.isStarting = false;
      state.startError = null;
    },
    clearStartError: (state) => {
      state.startError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchRouteDetails
      .addCase(fetchRouteDetails.pending, (state) => {
        state.isLoading = true;
        state.error     = null;
      })
      .addCase(fetchRouteDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.details   = action.payload;
      })
      .addCase(fetchRouteDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error     = action.payload;
      })
      // startTrip
      .addCase(startTrip.pending, (state) => {
        state.isStarting = true;
        state.startError = null;
      })
      .addCase(startTrip.fulfilled, (state) => {
        state.isStarting = false;
      })
      .addCase(startTrip.rejected, (state, action) => {
        state.isStarting = false;
        state.startError = action.payload;
      });
  },
});

export const { clearRouteDetails, clearStartError } = routeDetailsSlice.actions;
export default routeDetailsSlice.reducer;
