import { createSlice } from "@reduxjs/toolkit";

interface AppSettingsState {
  isNavbarVisible: boolean;
  isSideDrawerVisible?: boolean;
}

const initialState: AppSettingsState = {
  isNavbarVisible: true,
  isSideDrawerVisible: false,
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
    hideSideDrawer: (state) => {
      state.isSideDrawerVisible = false;
    },
    showSideDrawer: (state) => {
      state.isSideDrawerVisible = true;
    },
  },
});

export const { showNavbar, hideNavbar, showSideDrawer, hideSideDrawer } =
  appSettingsSlice.actions;

export default appSettingsSlice.reducer;
