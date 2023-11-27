import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface AppSettingsState {
  sidebar: {
    isOpen: boolean;
  };
  isNavbarVisible: boolean;
}

// Define the initial state using that type
const initialState: AppSettingsState = {
  sidebar: {
    isOpen: false,
  },
  isNavbarVisible: true,
};

export const appSettingsSlice = createSlice({
  name: "appSettings",
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.sidebar.isOpen = true;
    },
    closeSidebar: (state) => {
      state.sidebar.isOpen = false;
    },
    toggleSidebar: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen;
    },
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

// Action creators are generated for each case reducer function
export const {
  openSidebar,
  closeSidebar,
  toggleSidebar,
  showNavbar,
  hideNavbar,
} = appSettingsSlice.actions;

export default appSettingsSlice.reducer;
