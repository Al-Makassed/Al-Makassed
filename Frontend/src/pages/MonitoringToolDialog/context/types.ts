export interface MonitoringToolDialogContextValue {
  state: MonitoringToolDialogState;
  setIsEditingMode: (isEditingMode: boolean) => void;
}

export interface MonitoringToolDialogState {
  isEditingMode: boolean;
}

export type MonitoringToolsReducerAction =
  | { type: MonitoringToolsReducerActionType }
  | { type: "setIsEditingMode" };

export enum MonitoringToolsReducerActionType {
  setIsEditingMode,
}
