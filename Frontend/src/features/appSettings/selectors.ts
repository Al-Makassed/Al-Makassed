import type { RootState } from "../../app/store";

export const selectIsSidebarOpen = (state: RootState) =>
  state.appSettings.sidebar.isOpen;
