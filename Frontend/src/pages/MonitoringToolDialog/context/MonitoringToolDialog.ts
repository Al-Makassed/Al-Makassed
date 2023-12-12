import { createContext } from "react";
import {
  MonitoringToolDialogContextValue,
  MonitoringToolDialogState,
} from "./types";
import { noop } from "src/utils/functionsUtils";

export const initialState: MonitoringToolDialogState = {
  isEditingMode: false,
  isAppendFieldDialogOpen: false,
  isAssignDepartmentDialogOpen: false,
};

export const MonitoringToolsContext =
  createContext<MonitoringToolDialogContextValue>({
    state: initialState,
    setIsEditingMode: noop,
    onOpenAppendFieldsDialog: noop,
    onCloseAppendFieldsDialog: noop,
    onOpenAssignDepartmentsDialog: noop,
    onCloseAssignDepartmentsDialog: noop,
  });

export default MonitoringToolsContext;
