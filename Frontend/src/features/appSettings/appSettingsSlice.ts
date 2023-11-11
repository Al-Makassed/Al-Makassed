import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface AppSettingsState {
  sidebar: {
    isOpen: boolean;
  };
  // pageTitle: string;
}

// Define the initial state using that type
const initialState: AppSettingsState = {
  sidebar: {
    isOpen: false,
  },
  // pageTitle: "Al-Maqasid"
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
  },
});

// Action creators are generated for each case reducer function
export const { openSidebar, closeSidebar, toggleSidebar } =
  appSettingsSlice.actions;

export default appSettingsSlice.reducer;
