import { FC, PropsWithChildren, useCallback, useReducer } from "react";
import { MonitoringTool } from "../API/types";
import MonitoringToolsContext, { initialState } from "./MonitoringTools";
import {
  MonitoringToolsContextValue,
  MonitoringToolsState,
  MonitoringToolsReducerAction,
  MonitoringToolsReducerActionType,
} from "./types";

const MonitoringToolsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onOpenAddFieldDialog = useCallback(
    () =>
      dispatch({ type: MonitoringToolsReducerActionType.OpenAddFieldDialog }),
    [],
  );

  const onCloseAddFieldDialog = useCallback(
    () =>
      dispatch({ type: MonitoringToolsReducerActionType.CloseAddFieldDialog }),
    [],
  );

  const onOpenMTViewDialog = useCallback(
    (monitoringTool: MonitoringTool) =>
      dispatch({
        type: MonitoringToolsReducerActionType.OpenMonitoringToolsViewDialog,
        payload: monitoringTool,
      }),
    [],
  );

  const onCloseMTViewDialog = useCallback(
    () =>
      dispatch({
        type: MonitoringToolsReducerActionType.CloseMonitoringToolsViewDialog,
      }),
    [],
  );

  const contextValue: MonitoringToolsContextValue = {
    state,
    onOpenAddFieldDialog,
    onCloseAddFieldDialog,
    onOpenMTViewDialog,
    onCloseMTViewDialog,
  };

  return (
    <MonitoringToolsContext.Provider value={contextValue}>
      {children}
    </MonitoringToolsContext.Provider>
  );
};

export const reducer = (
  state: MonitoringToolsState,
  action: MonitoringToolsReducerAction,
): MonitoringToolsState => {
  switch (action.type) {
    case MonitoringToolsReducerActionType.OpenAddFieldDialog:
      return {
        ...state,
        isAddFieldDialogOpen: true,
      };

    case MonitoringToolsReducerActionType.CloseAddFieldDialog:
      return {
        ...state,
        isAddFieldDialogOpen: false,
      };

    case MonitoringToolsReducerActionType.OpenMonitoringToolsViewDialog:
      return {
        ...state,
        isMTViewDialogOpen: true,
        selectedMonitoringTool: action.payload!,
      };

    case MonitoringToolsReducerActionType.CloseMonitoringToolsViewDialog:
      return {
        ...state,
        isMTViewDialogOpen: false,
        selectedMonitoringTool: null,
      };

    default:
      return state;
  }
};

export default MonitoringToolsProvider;
