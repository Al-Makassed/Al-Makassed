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

  const onOpenAppendFieldsDialog = useCallback(
    () =>
      dispatch({
        type: MonitoringToolsReducerActionType.OpenAppendFieldsDialog,
      }),
    [],
  );

  const onCloseAppendFieldsDialog = useCallback(
    () =>
      dispatch({
        type: MonitoringToolsReducerActionType.CloseAppendFieldsDialog,
      }),
    [],
  );

  const onOpenAssignDepartmentsDialog = useCallback(
    () =>
      dispatch({
        type: MonitoringToolsReducerActionType.OpenAssignDepartmentsDialog,
      }),
    [],
  );

  const onCloseAssignDepartmentsDialog = useCallback(
    () =>
      dispatch({
        type: MonitoringToolsReducerActionType.CloseAssignDepartmentsDialog,
      }),
    [],
  );

  const contextValue: MonitoringToolDialogContextValue = {
    state,
    setIsEditingMode,
    onOpenAppendFieldsDialog,
    onCloseAppendFieldsDialog,
    onOpenAssignDepartmentsDialog,
    onCloseAssignDepartmentsDialog,
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
    case MonitoringToolsReducerActionType.OpenAppendFieldsDialog:
      return {
        ...state,
        isAppendFieldDialogOpen: true,
      };

    case MonitoringToolsReducerActionType.CloseAppendFieldsDialog:
      return {
        ...state,
        isAppendFieldDialogOpen: false,
      };
    case MonitoringToolsReducerActionType.OpenAssignDepartmentsDialog:
      return {
        ...state,
        isAssignDepartmentDialogOpen: true,
      };

    case MonitoringToolsReducerActionType.CloseAssignDepartmentsDialog:
      return {
        ...state,
        isAssignDepartmentDialogOpen: false,
      };
    default:
      return state;
  }
};

export default MonitoringToolsProvider;
