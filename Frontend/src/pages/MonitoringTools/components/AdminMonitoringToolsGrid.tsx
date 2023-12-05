import { Grid } from "@mui/material";
import { FC, useState } from "react";
import useGetMonitoringTools from "../hooks/useGetMonitoringTools";
import MonitoringToolCard from "./MonitoringToolCard";
import LoadingSkeleton from "./GridLoadingSkeleton";
import MonitoringToolViewDialog from "../../MonitoringToolDialog/components/MonitoringToolDialog";
import { MonitoringTool } from "../API/types";

const AdminMonitoringToolsGrid: FC = () => {
  const [isMTViewDialogOpen, setIsMTViewDialogOpen] = useState(false);
  const [selectedMonitoringTool, setSelectedMonitoringTool] =
    useState<MonitoringTool | null>(null);

  const { monitoringTools, isFetching } = useGetMonitoringTools();

  const handelOpenMTViewDialog = (monitoringTool: MonitoringTool) => {
    setIsMTViewDialogOpen(true);
    setSelectedMonitoringTool(monitoringTool);
  };
  const handleCloseMTViewDialog = () => {
    setIsMTViewDialogOpen(false);
    setSelectedMonitoringTool(null);
  };

  if (isFetching) return <LoadingSkeleton />;

  if (!monitoringTools) return null;

  return (
    <>
      <Grid container gap={3}>
        {monitoringTools.map((mt) => (
          <Grid
            item
            key={mt.id}
            sx={{
              width: {
                xs: "100%",
                sm: "calc((100% - 24px) / 2)",
                md: "calc((100% - 48px) / 3)",
                xl: "calc((100% - 72px) / 4)",
              },
            }}
          >
            <MonitoringToolCard
              monitoringTool={mt}
              onOpen={() => handelOpenMTViewDialog(mt)}
            />
          </Grid>
        ))}
      </Grid>

      <MonitoringToolViewDialog
        open={isMTViewDialogOpen}
        onClose={handleCloseMTViewDialog}
        monitoringToolId={selectedMonitoringTool?.id ?? ""}
      />
    </>
  );
};

export default AdminMonitoringToolsGrid;
