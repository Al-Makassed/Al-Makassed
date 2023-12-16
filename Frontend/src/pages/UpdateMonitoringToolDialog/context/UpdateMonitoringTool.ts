import { createContext } from "react";
import {
  UpdateMonitoringToolContextValue,
  UpdateMonitoringToolContextState,
} from "./types";
import { noop } from "src/utils/functionsUtils";

export const initialState: UpdateMonitoringToolContextState = {
  isEditingMode: false,
  openedDialog: null,
};

export const UpdateMonitoringToolContext =
  createContext<UpdateMonitoringToolContextValue>({
    state: initialState,
    onToggleEditMode: noop,
    onOpenAppendFieldsDialog: noop,
    onOpenAssignDepartmentsDialog: noop,
    onCloseDialog: noop,
  });

export default UpdateMonitoringToolContext;
