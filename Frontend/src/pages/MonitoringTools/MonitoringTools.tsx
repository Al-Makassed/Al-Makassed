import { FC } from "react";
import { Box, Stack } from "@mui/material";
import { selectIsFocalPointUser } from "src/features/user";
import { useAppSelector } from "src/store/hooks";
import AdminMonitoringToolsGrid from "./components/AdminMonitoringToolsGrid";
import FocalPointTasksGrid from "./components/FocalPointTasksGrid";
import PageHeader from "./components/PageHeader";
// import ActionsSpeedDial from "./components/ActionsSpeedDial";

const MonitoringTools: FC = () => {
  const isFocalPointUser = useAppSelector(selectIsFocalPointUser);

  return (
    <Stack gap={2} sx={{ p: "1.7em 2.5em", position: "relative" }}>
      <PageHeader />
      <Box>
        {isFocalPointUser ? (
          <FocalPointTasksGrid />
        ) : (
          <>
            <AdminMonitoringToolsGrid />
            {/* <ActionsSpeedDial /> */}
          </>
        )}
      </Box>
    </Stack>
  );
};

export default MonitoringTools;
