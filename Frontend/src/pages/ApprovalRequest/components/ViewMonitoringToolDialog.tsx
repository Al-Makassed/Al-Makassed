import React, { FC } from "react";
import MaqasidDialog from "src/components/MaqasidDialog";
import Chip from "@mui/material/Chip";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import useGetMonitoringTool from "../hooks/useGetMonitoringTool";
import { formatDate } from "src/utils";
import DescriptionIcon from "@mui/icons-material/Description";
import DateRangeIcon from "@mui/icons-material/DateRange";
import FieldIcon from "@mui/icons-material/QuizOutlined";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import { ViewMonitoringToolDialogProps } from "./types";
import ViewMonitoringToolDialogSkeleton from "./ViewMonitoringToolDialogSkeleton";

const ViewMonitoringToolDialog: FC<ViewMonitoringToolDialogProps> = ({
  monitoringToolId,
  open,
  onClose,
}) => {
  const { monitoringTool, isFetching } = useGetMonitoringTool(monitoringToolId);

  const DialogHeader = isFetching ? (
    <Typography variant="h3" width={"50%"}>
      <Skeleton />
    </Typography>
  ) : (
    <MaqasidDialog.Title flex={1} title={monitoringTool?.name} />
  );
  if (!monitoringTool) return null;

  return (
    <MaqasidDialog isOpen={open} onClose={onClose} variant="center">
      <MaqasidDialog.Header>
        <MaqasidDialog.Title />
        {DialogHeader}
        <MaqasidDialog.Actions>
          <Chip label="MonitoringTool" />
          <MaqasidDialog.Close />
        </MaqasidDialog.Actions>
      </MaqasidDialog.Header>
      {isFetching ? (
        <MaqasidDialog.Body>
          <ViewMonitoringToolDialogSkeleton />
        </MaqasidDialog.Body>
      ) : (
        <MaqasidDialog.Body>
          <Stack gap={2.5}>
            <Stack direction="row">
              <DescriptionIcon
                sx={{ mr: 2, color: (theme) => theme.palette.grey[600] }}
              />
              <Typography variant="body1">
                {monitoringTool.description}
              </Typography>
            </Stack>
            <Stack direction="row">
              <DateRangeIcon
                sx={{ mr: 2, color: (theme) => theme.palette.grey[600] }}
              />
              <Typography>
                {monitoringTool.createdAt
                  ? formatDate(monitoringTool.createdAt)
                  : "N/A"}
              </Typography>
            </Stack>

            <Stack direction="row">
              <HomeWorkIcon
                sx={{ mr: 3, color: (theme) => theme.palette.grey[600] }}
              />
              {monitoringTool.departments &&
                Array.isArray(monitoringTool.departments) &&
                monitoringTool.departments.map((department, index) => (
                  <Chip key={index} label={department.name} sx={{ mr: 1 }} />
                ))}
            </Stack>
            <Stack flexDirection={"row"} gap={1.5}>
              <FieldIcon sx={{ color: (theme) => theme.palette.grey[600] }} />

              <Typography variant="h6">Fields</Typography>
              <Box
                width={"100%"}
                borderTop={2}
                mt={2}
                borderColor={(theme) => theme.palette.grey[200]}
              />
              <Divider />
            </Stack>
            <List sx={{ mt: -2 }}>
              {Array.isArray(monitoringTool.fields) &&
                monitoringTool.fields.map((field) => (
                  <ListItem key={field.id}>
                    <ListItemText primary={field.content} />
                  </ListItem>
                ))}
            </List>
          </Stack>
        </MaqasidDialog.Body>
      )}
    </MaqasidDialog>
  );
};

export default ViewMonitoringToolDialog;
