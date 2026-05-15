import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

// Initial load — called on screen mount
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

// Called when user changes passenger type or to_stop
export const updateBookingSelection = createAsyncThunk(
  'booking/updateSelection',
  async ({ routeId, subRoute, toStopId, passengerType }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/ops/ticket/booking.php', {
        params: {
          route_id:       routeId,
          sub_route:      subRoute,
          to_stop_id:     toStopId,
          passenger_type: passengerType,
        },
      });
      const data = response.data;

      if (!data.status) {
        return rejectWithValue(data.message || 'Failed to update selection.');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Called when user taps "Print Ticket" on TicketPreview
export const issueTicket = createAsyncThunk(
  'booking/issueTicket',
  async ({ fromStopId, toStopId, passengerType }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/ops/ticket/booking.php', {
        action:         'issue_ticket',
        from_stop_id:   fromStopId,
        to_stop_id:     toStopId,
        passenger_type: passengerType,
      });
      const data = response.data;
      // Always return data — screen will show the message regardless of status
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Called when user taps "Update to Next Stop"
export const updateNextStop = createAsyncThunk(
  'booking/updateNextStop',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/ops/ticket/booking.php', {
        action: 'update_next_stop',
      });
      const data = response.data;

      // status false means no next stop — treat as completion, not error
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    bus:              null,
    route:            null,
    stopsContext:     null,
    dropdowns:        null,
    selection:        null,
    quote:            null,
    summary:          null,
    isLoading:        false,
    isUpdating:       false,   // passenger/stop selection update
    isUpdatingStop:   false,   // update next stop button
    isIssuing:        false,   // issue ticket button
    routeCompleted:   false,   // no next stop — show modal
    error:            null,
  },
  reducers: {
    clearBooking: (state) => {
      state.bus            = null;
      state.route          = null;
      state.stopsContext   = null;
      state.dropdowns      = null;
      state.selection      = null;
      state.quote          = null;
      state.summary        = null;
      state.error          = null;
      state.isUpdating     = false;
      state.isUpdatingStop = false;
      state.isIssuing      = false;
      state.routeCompleted = false;
    },
    clearRouteCompleted: (state) => {
      state.routeCompleted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ── Initial load ──
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
      })

      // ── Selection update (passenger type / to_stop) ──
      .addCase(updateBookingSelection.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateBookingSelection.fulfilled, (state, action) => {
        state.isUpdating   = false;
        state.selection    = action.payload.selection;
        state.quote        = action.payload.quote;
        state.summary      = action.payload.summary;
        state.dropdowns    = action.payload.dropdowns;
        state.stopsContext = action.payload.stops_context;
      })
      .addCase(updateBookingSelection.rejected, (state) => {
        state.isUpdating = false;
      })

      // ── Update next stop ──
      .addCase(updateNextStop.pending, (state) => {
        state.isUpdatingStop = true;
      })
      .addCase(updateNextStop.fulfilled, (state, action) => {
        state.isUpdatingStop = false;
        const data = action.payload;

        if (!data.status) {
          // No next stop — route completed
          state.routeCompleted = true;
          return;
        }

        // Update all relevant fields from fresh response
        state.stopsContext = data.stops_context;
        state.dropdowns    = data.dropdowns;
        state.selection    = data.selection;
        state.quote        = data.quote;
        state.summary      = data.summary;
      })
      .addCase(updateNextStop.rejected, (state) => {
        state.isUpdatingStop = false;
      })

      // ── Issue ticket ──
      .addCase(issueTicket.pending, (state) => {
        state.isIssuing = true;
      })
      .addCase(issueTicket.fulfilled, (state) => {
        state.isIssuing = false;
      })
      .addCase(issueTicket.rejected, (state) => {
        state.isIssuing = false;
      });
  },
});

export const { clearBooking, clearRouteCompleted } = bookingSlice.actions;
export default bookingSlice.reducer;
