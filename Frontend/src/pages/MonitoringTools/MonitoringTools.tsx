import { Box, Stack } from "@mui/material";
import { FC } from "react";
import { selectIsFocalPointUser } from "src/features/user";
import { useAppSelector } from "src/store/hooks";
import ActionsSpeedDial from "./components/ActionsSpeedDial";
import AdminMonitoringToolsGrid from "./components/AdminMonitoringToolsGrid";
import FocalPointTasksGrid from "./components/FocalPointTasksGrid";
import PageHeader from "./components/PageHeader";

const MonitoringTools: FC = () => {
  const isFocalPointUser = useAppSelector(selectIsFocalPointUser);

  return (
    <Stack gap={3} sx={{ p: 3 }}>
      <PageHeader />
      <Box>
        {isFocalPointUser ? (
          <FocalPointTasksGrid />
        ) : (
          <>
            <AdminMonitoringToolsGrid />
            <ActionsSpeedDial />
          </>
        )}
      </Box>
    </Stack>
  );
};

export default MonitoringTools;
