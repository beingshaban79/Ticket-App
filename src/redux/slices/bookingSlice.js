import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

export const fetchBookingData = createAsyncThunk(
  'booking/fetchBookingData',
  async ({ routeId, subRoute }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/ops/ticket/booking.php', {
        params: { route_id: routeId, sub_route: subRoute },
      });
      const data = response.data;

      if (!data.status) {
        return rejectWithValue(data.message || 'Failed to load booking data.');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    bus:           null,
    route:         null,
    stopsContext:  null,
    dropdowns:     null,
    selection:     null,
    quote:         null,
    summary:       null,
    isLoading:     false,
    error:         null,
  },
  reducers: {
    clearBooking: (state) => {
      state.bus          = null;
      state.route        = null;
      state.stopsContext = null;
      state.dropdowns    = null;
      state.selection    = null;
      state.quote        = null;
      state.summary      = null;
      state.error        = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingData.pending, (state) => {
        state.isLoading = true;
        state.error     = null;
      })
      .addCase(fetchBookingData.fulfilled, (state, action) => {
        state.isLoading    = false;
        state.bus          = action.payload.bus;
        state.route        = action.payload.route;
        state.stopsContext = action.payload.stops_context;
        state.dropdowns    = action.payload.dropdowns;
        state.selection    = action.payload.selection;
        state.quote        = action.payload.quote;
        state.summary      = action.payload.summary;
      })
      .addCase(fetchBookingData.rejected, (state, action) => {
        state.isLoading = false;
        state.error     = action.payload;
      });
  },
});

export const { clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
