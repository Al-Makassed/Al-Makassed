import React, { FC } from "react";
import MaqasidDialog from "src/components/MaqasidDialog";
import Chip from "@mui/material/Chip";
import { Stack, Typography } from "@mui/material";
import useGetMonitoringTool from "../hooks/useGetMonitoringTool";
import { formatDate } from "src/utils";
import DescriptionIcon from "@mui/icons-material/Description";
import DateRangeIcon from "@mui/icons-material/DateRange";

export interface ViewMonitoringToolDialogProps {
  monitoringToolId: string;
  open: boolean;
  onClose: () => void;
}

const ViewMonitoringToolDialog: FC<ViewMonitoringToolDialogProps> = ({
  monitoringToolId,
  open,
  onClose,
}) => {
  const { monitoringTool } = useGetMonitoringTool(monitoringToolId);

  if (!monitoringTool) return null;

  return (
    <MaqasidDialog isOpen={open} onClose={onClose} variant="center">
      <MaqasidDialog.Header>
        <MaqasidDialog.Title flex={1} title={monitoringTool.name} />
        <MaqasidDialog.Actions>
          <Chip label="MonitoringTool" />
          <MaqasidDialog.Close />
        </MaqasidDialog.Actions>
      </MaqasidDialog.Header>
      <MaqasidDialog.Body>
        {/* <Stack gap={2.5}>
          <Typography variant="body1">
            Description : {monitoringTool.description}
          </Typography>
          <Typography>
            Date Created: {formatDate(monitoringTool.createdAt)}
          </Typography>
          {/* {monitoringTool.fields.map(field => field + ": " + field)} */}
        {/* </Stack> */}
        <Stack gap={2.5}>
          <Stack direction="row">
            <DescriptionIcon fontSize="large" sx={{ pr: 2 }} />
            <Typography variant="body1">
              {monitoringTool.description}
            </Typography>
          </Stack>
          <Stack direction="row">
            <DateRangeIcon fontSize="large" sx={{ pr: 2 }} />
            <Typography>
              {monitoringTool.createdAt
                ? formatDate(monitoringTool.createdAt)
                : "N/A"}
            </Typography>
          </Stack>

          {/* {monitoringTool.fields.map((field, index) => (
            <Typography key={index}>{field.content}</Typography>
          ))}

          {monitoringTool.departments &&
            Array.isArray(monitoringTool.departments) &&
            monitoringTool.departments.map((department, index) => (
              <Typography key={index}>
                {department.name} - {department.headId}
                {/* Add other properties of the Department object as needed */}
          {/* </Typography> */}
          {/* ))} */}
        </Stack>
      </MaqasidDialog.Body>
    </MaqasidDialog>
  );
};

export default ViewMonitoringToolDialog;
