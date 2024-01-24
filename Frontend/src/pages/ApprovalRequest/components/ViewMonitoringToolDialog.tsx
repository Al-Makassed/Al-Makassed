import DateRangeIcon from "@mui/icons-material/DateRange";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import FieldIcon from "@mui/icons-material/QuizOutlined";
import DescriptionIcon from "@mui/icons-material/Subject";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import { FC } from "react";
import MaqasidDialog from "src/components/MaqasidDialog";
import { formatDate } from "src/utils";
import useGetMonitoringTool from "../hooks/useGetMonitoringTool";
import ViewMonitoringToolDialogSkeleton from "./ViewMonitoringToolDialogSkeleton";
import { ViewMonitoringToolDialogProps } from "./types";

const ViewMonitoringToolDialog: FC<ViewMonitoringToolDialogProps> = ({
  monitoringToolId,
  open,
  onClose,
}) => {
  const { monitoringTool, isFetching } = useGetMonitoringTool(monitoringToolId);

  const DialogHeader = isFetching ? (
    <Skeleton variant="rounded" height={35} width={200} sx={{ mr: "auto" }} />
  ) : (
    <MaqasidDialog.Title flex={1} title={monitoringTool?.name} />
  );

  if (!monitoringTool) return null;

  return (
    <MaqasidDialog isOpen={open} onClose={onClose} variant="center">
      <MaqasidDialog.Header>
        {DialogHeader}
        <MaqasidDialog.Actions>
          <Chip label="MonitoringTool" />
          <MaqasidDialog.Close />
        </MaqasidDialog.Actions>
      </MaqasidDialog.Header>
      {isFetching && (
        <MaqasidDialog.Body>
          <ViewMonitoringToolDialogSkeleton />
        </MaqasidDialog.Body>
      )}

      {!isFetching && (
        <MaqasidDialog.Body niceScroll>
          <Stack gap={2.5}>
            <Stack direction="row" alignItems="center" gap={1.2}>
              <DateRangeIcon
                sx={{
                  color: (theme) => theme.palette.grey[600],
                  fontSize: "1.25rem",
                }}
              />
              <Typography variant="body2">
                {monitoringTool.createdAt
                  ? formatDate(monitoringTool.createdAt)
                  : "N/A"}
              </Typography>
            </Stack>

            <Stack gap={1}>
              <Stack direction="row" alignItems="center" gap={0.5}>
                <DescriptionIcon
                  sx={{
                    color: (theme) => theme.palette.grey[600],
                    fontSize: "1.25rem",
                  }}
                />
                <Typography>Description:</Typography>
              </Stack>

              <Typography
                bgcolor={(theme) => theme.palette.grey[200]}
                px={1.5}
                py={0.7}
                borderRadius={1.5}
                borderColor={(theme) => theme.palette.grey[300]}
                width={"fit-content"}
                minWidth={"min(150px, 100%)"}
              >
                {monitoringTool.description}
              </Typography>
            </Stack>

            <Stack gap={1.5}>
              <Stack direction="row" alignItems="center" gap={1.2}>
                <HomeWorkIcon
                  sx={{
                    color: (theme) => theme.palette.grey[600],
                    fontSize: "1.25rem",
                  }}
                />
                <Typography>Departments:</Typography>
              </Stack>

              <Box flexDirection="row">
                {monitoringTool.departments &&
                  Array.isArray(monitoringTool.departments) &&
                  monitoringTool.departments.map((department, index) => (
                    <Chip
                      key={index}
                      label={department.name}
                      sx={{ mr: 1, mt: 1 }}
                    />
                  ))}
              </Box>
            </Stack>

            <Stack gap={1.5}>
              <Stack flexDirection="row" gap={1.5} alignItems="center">
                <FieldIcon
                  sx={{
                    color: (theme) => theme.palette.grey[600],
                    fontSize: "1.25rem",
                  }}
                />

                <Typography>Fields:</Typography>
              </Stack>

              <List
                sx={{
                  listStyleType: "disc",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  ml: 3,
                }}
              >
                {Array.isArray(monitoringTool.fields) &&
                  monitoringTool.fields.map((field) => (
                    <ListItem
                      key={field.id}
                      sx={{ display: "list-item" }}
                      disablePadding
                    >
                      <ListItemText primary={field.content} />
                    </ListItem>
                  ))}
              </List>
            </Stack>
          </Stack>
        </MaqasidDialog.Body>
      )}
    </MaqasidDialog>
  );
};

export default ViewMonitoringToolDialog;
