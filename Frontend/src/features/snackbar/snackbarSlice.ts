import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
type AlertColor = "success" | "warning" | "error";

interface SnackbarState {
  snackbarSetting: {
    isOpen: boolean;
    message: string;
    severity: AlertColor | undefined; // You can customize this based on your needs
  };
}

// Define the initial state using that type
const initialState: SnackbarState = {
  snackbarSetting: {
    isOpen: false,
    message: "",
    severity: "success", // You can customize this based on your needs
  },
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackbarOpen: (state, action) => {
      state.snackbarSetting.isOpen = true;
      state.snackbarSetting.message = action.payload.message;
      state.snackbarSetting.severity = action.payload.severity || "success";
    },
    setSnackbarClose: (state) => {
      state.snackbarSetting.isOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSnackbarOpen, setSnackbarClose } = snackbarSlice.actions;

export default snackbarSlice.reducer;
