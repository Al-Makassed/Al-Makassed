import React, { FC } from "react";
import MonitoringToolCard from "./components/MonitoringToolCard";
import { Grid, Stack } from "@mui/material";
import useGetMonitoringTools from "./hooks/useGetMonitoringTools";
import { MonitoringTool } from "./types";

const MonitoringTools: FC = () => {
  const { monitoringTools } = useGetMonitoringTools();

  console.log(monitoringTools);

  return (
    <Stack alignItems={"center"} justifyContent={"center"} m={"3.5em 0em"}>
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
    </Stack>
  );
};

export default MonitoringTools;
