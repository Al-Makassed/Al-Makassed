import { createContext } from "react";
import { MonitoringToolsContextValue, MonitoringToolsState } from "./types";
import { noop } from "src/utils/functionsUtils";

export const initialState: MonitoringToolsState = {
  openedDialog: null,
  selectedMonitoringTool: null,
};

export const MonitoringToolsContext =
  createContext<MonitoringToolsContextValue>({
    state: initialState,
    onOpenMTViewDialog: noop,
    onOpenAddFieldDialog: noop,
    onOpenAddMonitoringToolDialog: noop,
    onCloseDialog: noop,
  });

export default MonitoringToolsContext;
