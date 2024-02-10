import { Stack } from "@mui/material";
import React, { FC } from "react";
import SystemSidebar from "./components/SystemSidebar";
import { Outlet } from "react-router-dom";

const SystemSettings: FC = () => {
  return (
    <Stack direction="row" gap={3}>
      <SystemSidebar />
      <Outlet />
    </Stack>
  );
};

export default SystemSettings;
