import { MonitoringTool } from "../API/types";
import { MonitoringToolsDialog } from "../constants";

export interface MonitoringToolsContextValue {
  state: MonitoringToolsState;
  onOpenMTViewDialog: (monitoringTool: MonitoringTool) => void;
  onOpenAddFieldDialog: () => void;
  onOpenAddMonitoringToolDialog: () => void;
  onCloseDialog: () => void;
}

export interface MonitoringToolsState {
  openedDialog: MonitoringToolsDialog | null;
  selectedMonitoringTool: MonitoringTool | null;
}

export type MonitoringToolsReducerAction =
  | { type: MonitoringToolsReducerActionType }
  | { type: "OpenMonitoringToolsViewDialog"; payload: MonitoringTool };

export enum MonitoringToolsReducerActionType {
  OpenMonitoringToolsViewDialog,
  OpenAddFieldDialog,
  OpenAddMonitoringToolDialog,
  CloseDialog,
}
