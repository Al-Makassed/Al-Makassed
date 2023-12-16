import {
  MonitoringToolDialogState,
  MonitoringToolsReducerAction,
} from "../types";
import { useReducer } from "react";

const useMonitoringToolViewDialog = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    dispatch,
  };
};

export const initialState: MonitoringToolDialogState = {
  isEditingMode: false,
  openedDialog: null,
};

const reducer = (
  state: MonitoringToolDialogState,
  action: MonitoringToolsReducerAction,
): MonitoringToolDialogState => {
  switch (action.type) {
    case "SetIsEditingMode":
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

export default useMonitoringToolViewDialog;
