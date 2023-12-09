import { FC } from "react";
import { Box, Stack } from "@mui/material";
import { selectIsFocalPointUser } from "src/features/user";
import { useAppSelector } from "src/store/hooks";
import AdminMonitoringToolsGrid from "./components/AdminMonitoringToolsGrid";
import FocalPointTasksGrid from "./components/FocalPointTasksGrid";
import PageHeader from "./components/PageHeader";
import MonitoringToolsProvider from "./context/MonitoringToolsProvider";

const MonitoringTools: FC = () => {
  const isFocalPointUser = useAppSelector(selectIsFocalPointUser);

  return (
    <MonitoringToolsProvider>
      <Stack gap={2} sx={{ px: 4, py: 3 }}>
        <PageHeader />
        <Box>
          {isFocalPointUser ? (
            <FocalPointTasksGrid />
          ) : (
            <AdminMonitoringToolsGrid />
          )}
        </Box>
      </Stack>
    </MonitoringToolsProvider>
  );
};

export default MonitoringTools;
