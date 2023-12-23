import { FC, PropsWithChildren, useCallback, useReducer } from "react";
import { MonitoringTool } from "../API/types";
import MonitoringToolsContext, { initialState } from "./MonitoringTools";
import {
  MonitoringToolsContextValue,
  MonitoringToolsState,
  MonitoringToolsReducerAction,
  MonitoringToolsReducerActionType,
} from "./types";
import { MonitoringToolsDialog } from "../constants";

const MonitoringToolsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onCloseDialog = useCallback(
    () => dispatch({ type: MonitoringToolsReducerActionType.CloseDialog }),
    [],
  );

  const onOpenMTViewDialog = useCallback(
    (monitoringTool: MonitoringTool) =>
      dispatch({
        type: "OpenMonitoringToolsViewDialog",
        payload: monitoringTool,
      }),
    [],
  );

  const onOpenAddFieldDialog = useCallback(
    () =>
      dispatch({ type: MonitoringToolsReducerActionType.OpenAddFieldDialog }),
    [],
  );

  const onOpenAddMonitoringToolDialog = useCallback(
    () =>
      dispatch({
        type: MonitoringToolsReducerActionType.OpenAddMonitoringToolDialog,
      }),
    [],
  );

  const contextValue: MonitoringToolsContextValue = {
    state,
    onOpenAddFieldDialog,
    onOpenMTViewDialog,
    onOpenAddMonitoringToolDialog,
    onCloseDialog,
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
        openedDialog: MonitoringToolsDialog.AddField,
      };

    case "OpenMonitoringToolsViewDialog":
      return {
        ...state,
        openedDialog: MonitoringToolsDialog.MonitoringTool,
        selectedMonitoringTool: action.payload,
      };

    case MonitoringToolsReducerActionType.OpenAddMonitoringToolDialog:
      return {
        ...state,
        openedDialog: MonitoringToolsDialog.AddMonitoringTool,
      };

    case MonitoringToolsReducerActionType.CloseDialog:
      return {
        ...state,
        openedDialog: null,
      };

    default:
      return state;
  }
};

export default MonitoringToolsProvider;
