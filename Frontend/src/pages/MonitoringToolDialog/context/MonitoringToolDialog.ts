import { createContext } from "react";
import {
  MonitoringToolDialogContextValue,
  MonitoringToolDialogState,
} from "./types";
import { noop } from "src/utils/functionsUtils";

export const initialState: MonitoringToolDialogState = {
  isEditingMode: false,
  isAppendFieldDialogOpen: false,
};

export const MonitoringToolsContext =
  createContext<MonitoringToolDialogContextValue>({
    state: initialState,
    setIsEditingMode: noop,
    onOpenAppendFieldDialog: noop,
    onCloseAppendFieldDialog: noop,
  });

export default MonitoringToolsContext;
