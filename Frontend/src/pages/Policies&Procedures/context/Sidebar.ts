import { createContext } from "react";
import { SidebarContextValue, SidebarState } from "./types";
import { noop } from "src/utils";

export const initialState: SidebarState = {
  isSidebarOpen: true,
};
export const SidebarContext = createContext<SidebarContextValue>({
  state: initialState,
  openSidebar: noop, // Add openSidebar and closeSidebar
  closeSidebar: noop, // Add openSidebar and closeSidebar
});
