import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "not-authenticated", // 'checking' 'not-authenticated', 'authenticated'
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    englishLevel: null,
    skills: null,
    role: null,
    errorMessage: null,
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = "authenticated";
      state.id = payload.id;
      state.email = payload.email;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.englishLevel = payload.englishLevel;
      state.skills = payload.skills;
      state.role = payload.role;
      state.errorMessage = null;
    },
    logout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.id = null;
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.englishLevel = null;
      state.skills = null;
      state.role = null;
      state.errorMessage = payload?.errorMessage;
    },
    updateProfile: (state, { payload }) => {
      state.id = payload.id;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.englishLevel = payload.englishLevel;
      state.skills = payload.skills;
      state.role = payload.role;
    },
    checkingCredentials: (state) => {
      state.status = "checking";
      state.errorMessage = null;
    },
  },
});

export const { login, logout, checkingCredentials, updateProfile } = authSlice.actions;
