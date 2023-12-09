import { createContext } from "react";
import { MonitoringToolsContextValue } from "./types";
import { noop } from "src/utils/functionsUtils";

export const MonitoringToolsContext =
  createContext<MonitoringToolsContextValue>({
    isMTViewDialogOpen: false,
    selectedMonitoringTool: null,
    onOpenMTViewDialog: noop,
    onCloseMTViewDialog: noop,
  });

export default MonitoringToolsContext;
