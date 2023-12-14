export interface SidebarReducerAction {
  type: SidebarReducerActionType;
}

export enum SidebarReducerActionType {
  OpenSidebar,
  CloseSidebar,
}

export interface SidebarState {
  isSidebarOpen: boolean;
}

export interface SidebarContextValue {
  state: SidebarState;
  openSidebar: () => void;
  closeSidebar: () => void;
}
