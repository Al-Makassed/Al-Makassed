import React, { FC } from "react";
import { Chip, Stack } from "@mui/material";
import MaqasidDialog from "src/components/MaqasidDialog";
import useGetMonitoringTool from "./hooks/useGetMonitoringTool";
import UpdateIcon from "@mui/icons-material/Update";
import formatDate from "src/utils/formatDate";
import DescriptionSection from "./components/DescriptionSection";
import FieldsSection from "./components/FieldsSection";
import DepartmentsSection from "./components/DepartmentsSection";
import ViewerDialogSkeleton from "./components/ViewerDialogSkeleton";
import useMonitoringToolsContext from "../MonitoringTools/context/useMonitoringToolsContext";

const MonitoringToolViewDialog: FC = () => {
  const {
    state: { selectedMonitoringTool, isMTViewDialogOpen },
    onCloseMTViewDialog,
  } = useMonitoringToolsContext();

  const monitoringToolId = selectedMonitoringTool?.id ?? "";

  const { monitoringTool, isFetching } = useGetMonitoringTool(monitoringToolId);

  const lastModified =
    monitoringTool?.lastModified && formatDate(monitoringTool.lastModified);

  const handleCloseDialog = () => onCloseMTViewDialog();

  return (
    <>
      <MaqasidDialog
        isOpen={isMTViewDialogOpen}
        onClose={handleCloseDialog}
        variant="right"
      >
        <MaqasidDialog.Header>
          <MaqasidDialog.Title flex={1} title={monitoringTool?.name} />
          <MaqasidDialog.Actions>
            <Chip label="View" />
            <MaqasidDialog.Fullscreen />
            <MaqasidDialog.Close />
          </MaqasidDialog.Actions>
        </MaqasidDialog.Header>
        <MaqasidDialog.Body>
          {isFetching ? (
            <ViewerDialogSkeleton />
          ) : (
            monitoringTool && (
              <Stack gap={2}>
                <Chip
                  icon={<UpdateIcon />}
                  label={`Last Modified: ${lastModified}`}
                  variant="outlined"
                  sx={{ mb: 2, width: "fit-content" }}
                />

                <DescriptionSection description={monitoringTool.description} />

                <FieldsSection fields={monitoringTool.fields} />

                <DepartmentsSection departments={monitoringTool.departments} />
              </Stack>
            )
          )}
        </MaqasidDialog.Body>
      </MaqasidDialog>
    </>
  );
};

export default MonitoringToolViewDialog;
