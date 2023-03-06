import { configureStore } from '@reduxjs/toolkit';
import { globalSlice } from './slices/global/globalSlice';

export const store = configureStore({
  reducer: {
    global: globalSlice.reducer
  },
})