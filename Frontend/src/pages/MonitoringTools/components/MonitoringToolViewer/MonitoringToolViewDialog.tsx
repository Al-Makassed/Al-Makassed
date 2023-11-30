import React, { FC } from "react";
import { Chip, Stack } from "@mui/material";
import MaqasidDialog from "src/components/MaqasidDialog";
import { MonitoringToolViewDialogProps } from "./types";
import useGetMonitoringTool from "../../hooks/useGetMonitoringTool";
import UpdateIcon from "@mui/icons-material/Update";
import formatDate from "src/utils/formatDate";
import DescriptionSection from "./DescriptionSection";
import FieldsSection from "./FieldsSection";
import DepartmentsSection from "./DepartmentsSection";
import ViewerDialogSkeleton from "./ViewerDialogSkeleton";

const MonitoringToolViewDialog: FC<MonitoringToolViewDialogProps> = ({
  open,
  onClose,
  monitoringToolId,
}) => {
  const { monitoringTool, isFetching } = useGetMonitoringTool(monitoringToolId);

  const handleCloseDialog = () => onClose();

  const lastModified =
    monitoringTool?.lastModified && formatDate(monitoringTool.lastModified);

  return (
    <>
      <MaqasidDialog isOpen={open} onClose={handleCloseDialog} variant="right">
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
          ) : monitoringTool ? (
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
          ) : null}
        </MaqasidDialog.Body>
      </MaqasidDialog>
    </>
  );
};

export default MonitoringToolViewDialog;
