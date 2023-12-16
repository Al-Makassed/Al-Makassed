import { useContext } from "react";
import MonitoringToolsDialogContext from "./MonitoringToolDialog";

const useMonitoringToolsDialogContext = () => {
  const context = useContext(MonitoringToolsDialogContext);

  if (!context)
    throw new Error(
      "useMonitoringToolsDialog must be used within a MonitoringToolsDialogProvider",
    );

  return context;
};

export default useMonitoringToolsDialogContext;
