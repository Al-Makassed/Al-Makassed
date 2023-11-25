import React, { FC } from "react";
import { Stack } from "@mui/material";
import AdminMonitoringTools from "./components/MonitoringToolsList";
import MonitoringToolAdditionButton from "./components/MonitoringToolAdditionButton";

const MonitoringTools: FC = () => {
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      m={"3.5em 0 4.5em 0"}
      position={"relative"}
    >
      <AdminMonitoringTools />
      <MonitoringToolAdditionButton />
    </Stack>
  );
};

export default MonitoringTools;
