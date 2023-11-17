import type { RootState } from "../../store/store";

export const selectIsSidebarOpen = (state: RootState) =>
  state.appSettings.sidebar.isOpen;
