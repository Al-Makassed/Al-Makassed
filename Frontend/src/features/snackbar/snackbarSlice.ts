import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SnackbarState, ShowSnackbarPayload } from "./types";
import { showSnackbarHelper } from "./utils";

const initialState: SnackbarState = {
  isOpen: false,
  severity: "info",
  variant: "standard",
  title: null,
  message: "",
  anchorOrigin: { vertical: "top", horizontal: "center" },
  autoHideDuration: 6000,
  icon: undefined,
  alertAction: null,
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<ShowSnackbarPayload>) => {
      showSnackbarHelper(state, action.payload);
    },
    showSuccessSnackbar: (
      state,
      action: PayloadAction<Omit<ShowSnackbarPayload, "severity">>,
    ) => {
      const payload: ShowSnackbarPayload = {
        ...action.payload,
        severity: "success",
      };

      showSnackbarHelper(state, payload);
    },
    showErrorSnackbar: (
      state,
      action: PayloadAction<Omit<ShowSnackbarPayload, "severity">>,
    ) => {
      const payload: ShowSnackbarPayload = {
        ...action.payload,
        severity: "error",
      };

      showSnackbarHelper(state, payload);
    },
    showWarningSnackbar: (
      state,
      action: PayloadAction<Omit<ShowSnackbarPayload, "severity">>,
    ) => {
      const payload: ShowSnackbarPayload = {
        ...action.payload,
        severity: "warning",
      };

      showSnackbarHelper(state, payload);
    },
    hideSnackbar: (state) => {
      state.isOpen = false;
    },
  },
});

export const {
  showSnackbar,
  showSuccessSnackbar,
  showErrorSnackbar,
  showWarningSnackbar,
  hideSnackbar,
} = snackbarSlice.actions;

export default snackbarSlice.reducer;
