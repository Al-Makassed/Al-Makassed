import { FC, PropsWithChildren, useCallback, useReducer } from "react";
import MonitoringToolsContext, { initialState } from "./MonitoringToolDialog";
import {
  MonitoringToolDialogContextValue,
  MonitoringToolDialogState,
  MonitoringToolsReducerAction,
  MonitoringToolsReducerActionType,
} from "./types";

const MonitoringToolsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setIsEditingMode = useCallback(
    () => dispatch({ type: MonitoringToolsReducerActionType.setIsEditingMode }),
    [],
  );

  const onOpenAppendFieldDialog = useCallback(
    () =>
      dispatch({
        type: MonitoringToolsReducerActionType.OpenAppendFieldDialog,
      }),
    [],
  );

  const onCloseAppendFieldDialog = useCallback(
    () =>
      dispatch({
        type: MonitoringToolsReducerActionType.CloseAppendFieldDialog,
      }),
    [],
  );

  const contextValue: MonitoringToolDialogContextValue = {
    state,
    setIsEditingMode,
    onOpenAppendFieldDialog,
    onCloseAppendFieldDialog,
  };

  return (
    <MonitoringToolsContext.Provider value={contextValue}>
      {children}
    </MonitoringToolsContext.Provider>
  );
};

export const reducer = (
  state: MonitoringToolDialogState,
  action: MonitoringToolsReducerAction,
): MonitoringToolDialogState => {
  switch (action.type) {
    case MonitoringToolsReducerActionType.setIsEditingMode:
      return {
        ...state,
        isEditingMode: !state.isEditingMode,
      };
    case MonitoringToolsReducerActionType.OpenAppendFieldDialog:
      return {
        ...state,
        isAppendFieldDialogOpen: true,
      };

    case MonitoringToolsReducerActionType.CloseAppendFieldDialog:
      return {
        ...state,
        isAppendFieldDialogOpen: false,
      };
    default:
      return state;
  }
};

export default MonitoringToolsProvider;
