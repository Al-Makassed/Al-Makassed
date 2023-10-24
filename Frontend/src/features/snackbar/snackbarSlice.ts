import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface SnackbarState {
  snackbar: {
    snackbarOpen: boolean;
    snackbarType: string;
    snackbarMessage: string;
  };
}

// Define the initial state using that type
const initialState: SnackbarState = {
  snackbar: {
    snackbarOpen: false,
    snackbarType: "success",
    snackbarMessage: "",
  },
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    snackbarOpen: (state) => {
      state.snackbar.snackbarOpen = true;
    },
    successType: (state) => {
      state.snackbar.snackbarType = "success";
      state.snackbar.snackbarMessage = " Added successfully ";
    },
    errorType: (state) => {
      state.snackbar.snackbarType = "error";
      state.snackbar.snackbarMessage = "  Addition error ";
    },
    // successAdd:(state)=>{
    //     state.snackbar.snackbarMessage = " Added successfully "
    // },
    // errorAdd:(state)=>{
    //     state.snackbar.snackbarMessage = "  Addition error "
    // }
  },
});

// Action creators are generated for each case reducer function
export const { successType, errorType } = snackbarSlice.actions;

export default snackbarSlice.reducer;
