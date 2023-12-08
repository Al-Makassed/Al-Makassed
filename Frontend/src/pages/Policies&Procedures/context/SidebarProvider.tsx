import React, { FC, PropsWithChildren, useCallback, useReducer } from "react";
import {
  SidebarContextValue,
  SidebarReducerAction,
  SidebarReducerActionType,
  SidebarState,
} from "./types";
import { SidebarContext, initialState } from "./Sidebar";

const SidebarProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = useCallback(
    () => dispatch({ type: SidebarReducerActionType.OpenSidebar }),
    [],
  );
  const closeSidebar = useCallback(
    () => dispatch({ type: SidebarReducerActionType.CloseSidebar }),
    [],
  );

  const sidebarContextValue: SidebarContextValue = {
    state,
    openSidebar,
    closeSidebar,
  };

  return (
    <SidebarContext.Provider value={sidebarContextValue}>
      {children}
    </SidebarContext.Provider>
  );
};

export const reducer = (
  state: SidebarState,
  action: SidebarReducerAction,
): SidebarState => {
  switch (action.type) {
    case SidebarReducerActionType.OpenSidebar:
      return {
        ...state,
        isSidebarOpen: true,
      };
    case SidebarReducerActionType.CloseSidebar:
      return {
        ...state,
        isSidebarOpen: false,
      };

    default:
      return state;
  }
};

export default SidebarProvider;
