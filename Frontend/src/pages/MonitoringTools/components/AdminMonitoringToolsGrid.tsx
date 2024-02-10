import { Grid } from "@mui/material";
import { FC } from "react";
import AddMonitoringToolDialog from "src/pages/AddMonitoringToolDialog";
import UpdateMonitoringToolProvider from "src/pages/UpdateMonitoringToolDialog/context/UpdateMonitoringToolProvider";
import UpdateMonitoringToolDialog from "../../UpdateMonitoringToolDialog";
import useGetMonitoringTools from "../hooks/useGetMonitoringTools";
import LoadingSkeleton from "./GridLoadingSkeleton";
import MonitoringToolCard from "./MonitoringToolCard";
import AddFieldDialog from "src/pages/AddFieldDialog/AddFieldDialog";

const AdminMonitoringToolsGrid: FC = () => {
  const { monitoringTools, isFetching } = useGetMonitoringTools();

  if (isFetching) return <LoadingSkeleton key="AdminMonitoringToolsGrid" />;

  return (
    <>
      <Grid container gap={3}>
        {monitoringTools?.map((mt) => (
          <Grid
            item
            key={mt.id}
            sx={{
              width: {
                xs: "100%",
                sm: "calc((100% - 24px) / 2)",
                md: "calc((100% - 48px) / 3)",
                xl: "calc((100% - 72px) / 4)",
              },
            }}
          >
            <MonitoringToolCard monitoringTool={mt} />
          </Grid>
        ))}
      </Grid>

      <UpdateMonitoringToolProvider>
        <UpdateMonitoringToolDialog />
      </UpdateMonitoringToolProvider>

      <AddFieldDialog />

      <AddMonitoringToolDialog />
    </>
  );
};

export default AdminMonitoringToolsGrid;
