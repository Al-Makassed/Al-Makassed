import { Grid } from "@mui/material";
import { FC } from "react";
import useGetMonitoringTools from "../hooks/useGetMonitoringTools";
import MonitoringToolCard from "./MonitoringToolCard";
import LoadingSkeleton from "./LoadingSkeleton";

const AdminMonitoringToolsGrid: FC = () => {
  const { monitoringTools, isFetching } = useGetMonitoringTools();

  if (isFetching) return <LoadingSkeleton />;

  if (!monitoringTools) return null;

  return (
    <Grid container gap={3}>
      {monitoringTools.map((mt) => (
        <Grid
          item
          key={mt.id}
          sx={{
            width: {
              xs: "100%",
              md: "calc((100% - 48px) / 3)",
              xl: "calc((100% - 72px) / 4)",
            },
          }}
        >
          <MonitoringToolCard monitoringTool={mt} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AdminMonitoringToolsGrid;
