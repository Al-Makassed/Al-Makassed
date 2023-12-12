export interface MonitoringToolDialogContextValue {
  state: MonitoringToolDialogState;
  setIsEditingMode: (isEditingMode: boolean) => void;
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

export enum MonitoringToolsReducerActionType {
  setIsEditingMode,
  OpenAppendFieldsDialog,
  CloseAppendFieldsDialog,
  OpenAssignDepartmentsDialog,
  CloseAssignDepartmentsDialog,
}
