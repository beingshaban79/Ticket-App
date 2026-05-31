import { configureStore } from '@reduxjs/toolkit';
import authReducer          from './slices/authSlice';
import routeReducer         from './slices/routeSlice';
import bookingReducer       from './slices/bookingSlice';
import routeDetailsReducer  from './slices/routeDetailsSlice';
import profileReducer       from './slices/profileSlice';
import ticketHistoryReducer from './slices/ticketHistorySlice';

export const store = configureStore({
  reducer: {
    auth:          authReducer,
    routes:        routeReducer,
    booking:       bookingReducer,
    routeDetails:  routeDetailsReducer,
    profile:       profileReducer,
    ticketHistory: ticketHistoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
