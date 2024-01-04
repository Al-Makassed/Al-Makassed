import { Stack } from "@mui/material";
import React, { FC } from "react";
import SystemSidebar from "./components/SystemSidebar";
import { Outlet } from "react-router-dom";

const SystemSettings: FC = () => {
  return (
    // <Grid container>
    //   <Grid item xs={6}  lg={3} xl={2.3} >
    //     <SystemSidebar />
    //   </Grid>
    //   <Grid item xs={6} lg={9} xl={9.7}>
    //     <Outlet />
    //   </Grid>
    // </Grid>
    <Stack direction="row" gap={3}>
      <SystemSidebar />
      <Outlet />
    </Stack>
  );
};

export default SystemSettings;
