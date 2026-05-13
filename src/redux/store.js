import { configureStore } from '@reduxjs/toolkit';
import authReducer    from './slices/authSlice';
import routeReducer   from './slices/routeSlice';
import bookingReducer from './slices/bookingSlice';

export const store = configureStore({
  reducer: {
    auth:    authReducer,
    routes:  routeReducer,
    booking: bookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
