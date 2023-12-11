import { useContext } from "react";
import MonitoringToolsContext from "./MonitoringTools";

const useMonitoringTools = () => {
  const context = useContext(MonitoringToolsContext);

  if (!context)
    throw new Error(
      "useMonitoringTools must be used within a MonitoringToolsProvider",
    );

  return context;
};

export default useMonitoringTools;
