import React, { FC } from "react";
import { Stack } from "@mui/material";
import AdminMonitoringTools from "./components/MonitoringToolsList";
import MonitoringToolAdditionButton from "./components/MonitoringToolAdditionButton";
import { selectUserRoles } from "src/features/user";
import { useAppSelector } from "src/store/hooks";
import FocalPointTasksList from "./components/FocalPointTasksList";

const MonitoringTools: FC = () => {
  const userRole = useAppSelector(selectUserRoles)[0];

  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      m={"3.5em 0 4.5em 0"}
      position={"relative"}
    >
      {userRole == "Focal Point" ? (
        <FocalPointTasksList />
      ) : (
        <>
          <AdminMonitoringTools />
          <MonitoringToolAdditionButton />
        </>
      )}
    </Stack>
  );
};

export default MonitoringTools;
