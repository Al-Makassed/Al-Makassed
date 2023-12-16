import DeleteIcon from "@mui/icons-material/Delete";
import {
  FormControlLabel,
  IconButton,
  Skeleton,
  Switch,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import ConfirmDialog from "src/components/ConfirmDialog";
import MaqasidDialog from "src/components/MaqasidDialog";
import { MonitoringToolsDialog } from "src/pages/MonitoringTools/constants";
import useMonitoringToolsContext from "../MonitoringTools/context/useMonitoringToolsContext";
import DialogBodyAndFooter from "./components/DialogBodyAndFooter";
import DialogSkeleton from "./components/DialogSkeleton";
import useUpdateMonitoringToolContext from "./context/useUpdateMonitoringToolContext";
import useDeleteMonitoringTool from "./hooks/useDeleteMonitoringTool";
import useGetMonitoringTool from "./hooks/useGetMonitoringTool";

const MonitoringToolViewDialog: FC = () => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] =
    useState<boolean>(false);

  const {
    state: { selectedMonitoringTool, openedDialog: openedMainDialog },
    onCloseDialog,
  } = useMonitoringToolsContext();

  const {
    state: { isEditingMode },
    onToggleEditMode,
  } = useUpdateMonitoringToolContext();

  const monitoringToolId = selectedMonitoringTool?.id ?? "";

  const { monitoringTool, isFetching } = useGetMonitoringTool(monitoringToolId);

  const { removeMonitoringTool } = useDeleteMonitoringTool();

  const closeConfirmDialog = () => setIsConfirmDialogOpen(false);

  const handleCloseDialog = () => {
    onCloseDialog();
  };

  const handleDeleteButtonClicked = () => setIsConfirmDialogOpen(true);

  const toggleEditMode = () => onToggleEditMode();

  const DialogHeader = isFetching ? (
    <Typography variant="h3" width={"50%"}>
      <Skeleton />
    </Typography>
  ) : (
    <MaqasidDialog.Title flex={1} title={monitoringTool?.name} />
  );

  return (
    <>
      <MaqasidDialog
        isOpen={openedMainDialog === MonitoringToolsDialog.MonitoringTool}
        onClose={handleCloseDialog}
        variant="right"
      >
        <MaqasidDialog.Header>
          {DialogHeader}
          <MaqasidDialog.Actions>
            <FormControlLabel
              sx={{ mr: 0, p: 1 }}
              control={<Switch onChange={toggleEditMode} />}
              label="Edit"
            />
            {isEditingMode && (
              <IconButton
                aria-label="delete"
                size="large"
                color="error"
                sx={{ p: 0.5 }}
                onClick={handleDeleteButtonClicked}
              >
                <DeleteIcon />
              </IconButton>
            )}
            <MaqasidDialog.Fullscreen />
            <MaqasidDialog.Close />
          </MaqasidDialog.Actions>
        </MaqasidDialog.Header>

        {isFetching && (
          <MaqasidDialog.Body>
            <DialogSkeleton />
          </MaqasidDialog.Body>
        )}

        {!isFetching && monitoringTool && (
          <DialogBodyAndFooter monitoringTool={monitoringTool} />
        )}
      </MaqasidDialog>

      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        title="Remove Field From Monitoring Tool"
        body="Are you sure you want to permanently remove monitoring tool?"
        onClose={closeConfirmDialog}
        actions={[
          {
            text: "Cancel",
            onClick: closeConfirmDialog,
            sx: { color: "grey.700" },
          },
          {
            text: "Delete",
            onClick: () => {
              closeConfirmDialog();
              removeMonitoringTool(monitoringToolId);
              handleCloseDialog();
            },
            color: "error",
          },
        ]}
      />
    </>
  );
};

export default MonitoringToolViewDialog;
