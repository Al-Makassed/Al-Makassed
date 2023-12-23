import { DialogName } from "../constants";

export interface UpdateMonitoringToolContextValue {
  state: UpdateMonitoringToolContextState;
  onToggleEditMode: () => void;
  onOpenAppendFieldsDialog: () => void;
  onOpenAssignDepartmentsDialog: () => void;
  onCloseDialog: () => void;
}

export interface UpdateMonitoringToolContextState {
  isEditingMode: boolean;
  openedDialog: DialogName | null;
}

export type UpdateMonitoringToolReducerAction =
  | { type: "ToggleEditMode" }
  | { type: "SetOpenDialog"; payload: DialogName | null };
