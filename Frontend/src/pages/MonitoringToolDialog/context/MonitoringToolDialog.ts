import { createContext } from "react";
import {
  MonitoringToolDialogContextValue,
  MonitoringToolDialogState,
} from "./types";
import { noop } from "src/utils/functionsUtils";

export const initialState: MonitoringToolDialogState = {
  isEditingMode: false,
  isAppendFieldDialogOpen: false, // TODO: Combine them into 'openedDialog'
  isAssignDepartmentDialogOpen: false, // TODO: Combine them into 'openedDialog'
};

export const MonitoringToolsContext =
  createContext<MonitoringToolDialogContextValue>({
    state: initialState,
    onSetIsEditingMode: noop,
    onOpenAppendFieldsDialog: noop,
    onCloseAppendFieldsDialog: noop,
    onOpenAssignDepartmentsDialog: noop,
    onCloseAssignDepartmentsDialog: noop,
  });

export default MonitoringToolsContext;
