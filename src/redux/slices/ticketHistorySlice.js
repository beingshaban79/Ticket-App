import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

export const fetchTicketHistory = createAsyncThunk(
  'ticketHistory/fetch',
  async (search = '', { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/ops/ticket/history.php', {
        params: { search },
      });
      const data = response.data;
      if (!data.status) return rejectWithValue(data.message || 'Failed to load history.');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const cancelTicket = createAsyncThunk(
  'ticketHistory/cancel',
  async ({ ticketId, reason = 'Passenger cancelled' }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/ops/ticket/cancel.php', {
        ticket_id: ticketId,
        reason,
      });
      const data = response.data;
      // Always return data so screen can show the message
      return { ...data, ticketId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ticketHistorySlice = createSlice({
  name: 'ticketHistory',
  initialState: {
    activeTrip:   null,
    bus:          null,
    conductor:    null,
    summary:      null,
    tickets:      [],
    isLoading:    false,
    isCancelling: false,
    error:        null,
  },
  reducers: {
    removeTicket: (state, action) => {
      state.tickets = state.tickets.filter(
        (t) => t.ticket_id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTicketHistory.pending, (state) => {
        state.isLoading = true;
        state.error     = null;
      })
      .addCase(fetchTicketHistory.fulfilled, (state, action) => {
        state.isLoading  = false;
        state.activeTrip = action.payload.active_trip;
        state.bus        = action.payload.bus;
        state.conductor  = action.payload.conductor;
        state.summary    = action.payload.summary;
        state.tickets    = action.payload.tickets || [];
      })
      .addCase(fetchTicketHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error     = action.payload;
      })
      .addCase(cancelTicket.pending, (state) => {
        state.isCancelling = true;
      })
      .addCase(cancelTicket.fulfilled, (state, action) => {
        state.isCancelling = false;
        // Remove ticket from list if cancel succeeded
        if (action.payload.status) {
          state.tickets = state.tickets.filter(
            (t) => t.ticket_id !== action.payload.ticketId
          );
        }
      })
      .addCase(cancelTicket.rejected, (state) => {
        state.isCancelling = false;
      });
  },
});

export const { removeTicket } = ticketHistorySlice.actions;
export default ticketHistorySlice.reducer;
