import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface DeleteDialogState {
  isOpen: boolean;
}

// Define the initial state using that type
const initialState: DeleteDialogState = {
  isOpen: false,
};

export const deleteDialogSlice = createSlice({
  name: "deleteDialog",
  initialState,
  reducers: {
    openDialog: (state) => {
      state.isOpen = true;
    },
    closeDialog: (state) => {
      state.isOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openDialog, closeDialog } = deleteDialogSlice.actions;

export default deleteDialogSlice.reducer;
