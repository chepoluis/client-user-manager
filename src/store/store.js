import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth/authSlice';
import { globalSlice } from './slices/global/globalSlice';

export const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
    auth: authSlice.reducer
  },
})