import type { RootState } from "../../app/store";

export const selectSnackbar = (state: RootState) =>
  state.snackbarSetting.snackbarSetting;
