import type { RootState } from "../../app/store";

export const selectIsSnackbarOpen = (state: RootState) =>
  state.snackbar.snackbar.snackbarOpen;

export const selectSnackbarSuccess = (state: RootState) => {
  state.snackbar.snackbar.snackbarType;
  state.snackbar.snackbar.snackbarMessage;
};

export const selectSnackbarError = (state: RootState) => {
  state.snackbar.snackbar.snackbarType;
  state.snackbar.snackbar.snackbarMessage;
};
