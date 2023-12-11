import { createContext } from "react";
import {
  MonitoringToolDialogContextValue,
  MonitoringToolDialogState,
} from "./types";
import { noop } from "src/utils/functionsUtils";

export const initialState: MonitoringToolDialogState = {
  isEditingMode: false,
};

export const MonitoringToolsContext =
  createContext<MonitoringToolDialogContextValue>({
    state: initialState,
    setIsEditingMode: noop,
  });

export default MonitoringToolsContext;
