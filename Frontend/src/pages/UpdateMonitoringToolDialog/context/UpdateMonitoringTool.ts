import { createContext } from "react";
import {
  MonitoringToolDialogContextValue,
  MonitoringToolDialogState,
} from "./types";
import { noop } from "src/utils/functionsUtils";

export const initialState: MonitoringToolDialogState = {
  isEditingMode: false,
  openedDialog: null,
};

export const UpdateMonitoringToolContext =
  createContext<MonitoringToolDialogContextValue>({
    state: initialState,
    onToggleEditMode: noop,
    onOpenAppendFieldsDialog: noop,
    onOpenAssignDepartmentsDialog: noop,
    onCloseDialog: noop,
  });

export default UpdateMonitoringToolContext;
