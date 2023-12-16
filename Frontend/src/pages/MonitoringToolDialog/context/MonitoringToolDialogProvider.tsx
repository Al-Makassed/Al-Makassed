import { FC, PropsWithChildren, useCallback, useReducer } from "react";
import MonitoringToolsContext, { initialState } from "./MonitoringToolDialog";
import {
  MonitoringToolDialogContextValue,
  MonitoringToolDialogState,
  MonitoringToolsReducerAction,
} from "./types";
import { DialogName } from "../constants";

const MonitoringToolsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onToggleEditMode = useCallback(
    () => dispatch({ type: "ToggleEditMode" }),
    [],
  );

  const onOpenAppendFieldsDialog = useCallback(
    () =>
      dispatch({
        type: "SetOpenDialog",
        payload: DialogName.AppendField,
      }),
    [],
  );

  const onOpenAssignDepartmentsDialog = useCallback(
    () =>
      dispatch({
        type: "SetOpenDialog",
        payload: DialogName.AssignDepartment,
      }),
    [],
  );

  const onCloseDialog = useCallback(
    () =>
      dispatch({
        type: "SetOpenDialog",
        payload: null,
      }),
    [],
  );

  const contextValue: MonitoringToolDialogContextValue = {
    state,
    onToggleEditMode,
    onOpenAppendFieldsDialog,
    onOpenAssignDepartmentsDialog,
    onCloseDialog,
  };

  return (
    <MonitoringToolsContext.Provider value={contextValue}>
      {children}
    </MonitoringToolsContext.Provider>
  );
};

const reducer = (
  state: MonitoringToolDialogState,
  action: MonitoringToolsReducerAction,
): MonitoringToolDialogState => {
  switch (action.type) {
    case "ToggleEditMode":
      return {
        ...state,
        isEditingMode: !state.isEditingMode,
      };

    case "SetOpenDialog": {
      const openedDialog = action.payload;
      return {
        ...state,
        openedDialog,
      };
    }

    default:
      return state;
  }
};

export default MonitoringToolsProvider;
