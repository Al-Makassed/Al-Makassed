import React, { FC } from "react";
import MonitoringToolCard from "./MonitoringToolCard";
import { Grid } from "@mui/material";
import useGetMonitoringTools from "../hooks/useGetMonitoringTools";
import { MonitoringTool } from "../types";
import MonitoringToolsSkeleton from "./MonitoringToolsSkeleton";

const AdminMonitoringTools: FC = () => {
  const { monitoringTools, isFetching } = useGetMonitoringTools();

  return isFetching ? (
    <MonitoringToolsSkeleton />
  ) : (
    <Grid
      container
      spacing={{ xs: 4, md: 4 }}
      columns={{ xs: 2, sm: 2, md: 8, lg: 12 }}
      maxWidth={"85vw"}
    >
      {monitoringTools?.map((mt: MonitoringTool) => (
        <Grid item xs={2} sm={4} md={4} key={mt.id}>
          <MonitoringToolCard monitoringTool={mt} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AdminMonitoringTools;
