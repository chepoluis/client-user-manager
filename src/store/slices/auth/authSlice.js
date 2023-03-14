import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "not-authenticated", // 'checking' 'not-authenticated', 'authenticated'
    email: null,
    displayName: null,
    errorMessage: null,
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = "authenticated";
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.errorMessage = null;
    },
    logout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.email = null;
      state.displayName = null;
      state.errorMessage = payload?.errorMessage;
    },
    checkingCredentials: (state) => {
      state.status = "checking";
      state.errorMessage = null;
    },
  },
});

export const { login, logout, checkingCredentials } = authSlice.actions;
