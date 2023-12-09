import { MonitoringTool } from "../API/types";

export interface MonitoringToolsContextValue {
  isMTViewDialogOpen: boolean;
  isAddFieldDialogOpen: boolean;
  selectedMonitoringTool: MonitoringTool | null;
  onOpenMTViewDialog: (monitoringTool: MonitoringTool) => void;
  onCloseMTViewDialog: () => void;
  onOpenAddFieldDialog: () => void;
  onCloseAddFieldDialog: () => void;
}
