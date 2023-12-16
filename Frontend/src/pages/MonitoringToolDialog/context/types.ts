export interface MonitoringToolDialogContextValue {
  state: MonitoringToolDialogState;
  onSetIsEditingMode: (isEditingMode: boolean) => void;
  onOpenAppendFieldsDialog: () => void;
  onCloseAppendFieldsDialog: () => void;
  onOpenAssignDepartmentsDialog: () => void;
  onCloseAssignDepartmentsDialog: () => void;
}

export interface MonitoringToolDialogState {
  isEditingMode: boolean;
  isAppendFieldDialogOpen: boolean;
  isAssignDepartmentDialogOpen: boolean;
}

export type MonitoringToolsReducerAction = {
  type: MonitoringToolsReducerActionType;
};

// TODO: extract enums to constants file
export enum MonitoringToolsReducerActionType {
  SetIsEditingMode,
  OpenAppendFieldsDialog,
  CloseAppendFieldsDialog,
  OpenAssignDepartmentsDialog,
  CloseAssignDepartmentsDialog,
}

export enum Dialog {
  AppendFields = "AppendFields",
  AssignDepartments = "AssignDepartments",
}
