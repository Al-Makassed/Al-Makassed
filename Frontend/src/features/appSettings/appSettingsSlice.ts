import { createSlice } from "@reduxjs/toolkit";

interface AppSettingsState {
  isNavbarVisible: boolean;
}

const initialState: AppSettingsState = {
  isNavbarVisible: true,
};

export const appSettingsSlice = createSlice({
  name: "appSettings",
  initialState,
  reducers: {
    toggleNavbar: (state) => {
      state.isNavbarVisible = !state.isNavbarVisible;
    },
    hideNavbar: (state) => {
      state.isNavbarVisible = false;
    },
    showNavbar: (state) => {
      state.isNavbarVisible = true;
    },
  },
});

export const { showNavbar, hideNavbar } = appSettingsSlice.actions;

export default appSettingsSlice.reducer;
