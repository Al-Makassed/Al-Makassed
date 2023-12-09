import { createContext } from "react";
import { MonitoringToolsContextValue, MonitoringToolsState } from "./types";
import { noop } from "src/utils/functionsUtils";

export const initialState: MonitoringToolsState = {
  isMTViewDialogOpen: false,
  isAddFieldDialogOpen: false,
  selectedMonitoringTool: null,
};

export const MonitoringToolsContext =
  createContext<MonitoringToolsContextValue>({
    state: initialState,
    onOpenMTViewDialog: noop,
    onCloseMTViewDialog: noop,
    onOpenAddFieldDialog: noop,
    onCloseAddFieldDialog: noop,
  });

export default MonitoringToolsContext;
