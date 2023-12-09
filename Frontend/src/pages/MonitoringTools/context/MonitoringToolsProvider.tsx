import { FC, PropsWithChildren, useState } from "react";
import { MonitoringTool } from "../API/types";
import MonitoringToolsContext from "./MonitoringTools";
import { MonitoringToolsContextValue } from "./types";

const MonitoringToolsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isMTViewDialogOpen, setIsMTViewDialogOpen] = useState(false);
  const [isAddFieldDialogOpen, setIsAddFieldDialogOpen] = useState(false);
  const [selectedMonitoringTool, setSelectedMonitoringTool] =
    useState<MonitoringTool | null>(null);

  const onOpenMTViewDialog = (monitoringTool: MonitoringTool) => {
    setIsMTViewDialogOpen(true);
    setSelectedMonitoringTool(monitoringTool);
  };

  const onCloseMTViewDialog = () => {
    setIsMTViewDialogOpen(false);
    setSelectedMonitoringTool(null);
  };

  const onOpenAddFieldDialog = () => setIsAddFieldDialogOpen(true);

  const onCloseAddFieldDialog = () => setIsAddFieldDialogOpen(false);

  const contextValue: MonitoringToolsContextValue = {
    isMTViewDialogOpen,
    selectedMonitoringTool,
    onOpenMTViewDialog,
    onCloseMTViewDialog,
    isAddFieldDialogOpen,
    onOpenAddFieldDialog,
    onCloseAddFieldDialog,
  };

  return (
    <MonitoringToolsContext.Provider value={contextValue}>
      {children}
    </MonitoringToolsContext.Provider>
  );
};

export default MonitoringToolsProvider;
