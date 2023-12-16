import { DialogName } from "../constants";

export interface MonitoringToolDialogContextValue {
  state: MonitoringToolDialogState;
  onToggleEditMode: () => void;
  onOpenAppendFieldsDialog: () => void;
  onOpenAssignDepartmentsDialog: () => void;
  onCloseDialog: () => void;
}

export interface MonitoringToolDialogState {
  isEditingMode: boolean;
  openedDialog: DialogName | null;
}

export type MonitoringToolsReducerAction =
  | { type: "ToggleEditMode" }
  | { type: "SetOpenDialog"; payload: DialogName | null };
