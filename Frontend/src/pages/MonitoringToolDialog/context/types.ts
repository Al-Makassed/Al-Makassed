export interface MonitoringToolDialogContextValue {
  state: MonitoringToolDialogState;
  setIsEditingMode: (isEditingMode: boolean) => void;
  onOpenAppendFieldDialog: () => void;
  onCloseAppendFieldDialog: () => void;
}

export interface MonitoringToolDialogState {
  isEditingMode: boolean;
  isAppendFieldDialogOpen: boolean;
}

export type MonitoringToolsReducerAction = {
  type: MonitoringToolsReducerActionType;
};

export enum MonitoringToolsReducerActionType {
  setIsEditingMode,
  OpenAppendFieldDialog,
  CloseAppendFieldDialog,
}
