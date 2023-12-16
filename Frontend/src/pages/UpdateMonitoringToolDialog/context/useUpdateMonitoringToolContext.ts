import { useContext } from "react";
import UpdateMonitoringToolContext from "./UpdateMonitoringTool";

const useUpdateMonitoringToolContext = () => {
  const context = useContext(UpdateMonitoringToolContext);

  if (!context)
    throw new Error(
      "useUpdateMonitoringToolContext must be used within an UpdateMonitoringToolProvider",
    );

  return context;
};

export default useUpdateMonitoringToolContext;
