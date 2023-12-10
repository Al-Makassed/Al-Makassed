import { MonitoringTool } from "../API/types";

export interface MonitoringToolsContextValue {
  state: MonitoringToolsState;
  onOpenMTViewDialog: (monitoringTool: MonitoringTool) => void;
  onCloseMTViewDialog: () => void;
  onOpenAddFieldDialog: () => void;
  onCloseAddFieldDialog: () => void;
}

export interface MonitoringToolsState {
  isMTViewDialogOpen: boolean;
  isAddFieldDialogOpen: boolean;
  selectedMonitoringTool: MonitoringTool | null;
}

export type MonitoringToolsReducerAction =
  | { type: MonitoringToolsReducerActionType }
  | { type: "OpenMonitoringToolsViewDialog"; payload: MonitoringTool };

export enum MonitoringToolsReducerActionType {
  OpenMonitoringToolsViewDialog,
  CloseMonitoringToolsViewDialog,
  OpenAddFieldDialog,
  CloseAddFieldDialog,
}
