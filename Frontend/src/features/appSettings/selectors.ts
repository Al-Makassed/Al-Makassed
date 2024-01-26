import type { RootState } from "../../store/store";

export const selectIsNavbarVisible = (state: RootState) =>
  state.appSettings.isNavbarVisible;

export const selectIsSideDrawerVisible = (state: RootState) =>
  state.appSettings.isSideDrawerVisible;
