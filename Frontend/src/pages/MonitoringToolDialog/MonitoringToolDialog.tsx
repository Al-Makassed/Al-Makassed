import React, { FC, useState } from "react";
import {
  FormControlLabel,
  IconButton,
  Skeleton,
  Switch,
  Typography,
} from "@mui/material";
import MaqasidDialog from "src/components/MaqasidDialog";
import useGetMonitoringTool from "./hooks/useGetMonitoringTool";
import DialogSkeleton from "./components/DialogSkeleton";
import DeleteIcon from "@mui/icons-material/Delete";
import useDeleteMonitoringTool from "./hooks/useDeleteMonitoringTool";
import useMonitoringToolsContext from "../MonitoringTools/context/useMonitoringToolsContext";
import DialogBodyAndFooter from "./components/DialogBodyAndFooter";
import useMonitoringToolDialogContext from "./context/useMonitoringToolDialogContext";
import ConfirmDialog from "src/components/ConfirmDialog";

const MonitoringToolViewDialog: FC = () => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] =
    useState<boolean>(false);

  const {
    state: { isEditingMode },
    setIsEditingMode,
  } = useMonitoringToolDialogContext();

  const {
    state: { selectedMonitoringTool, isMTViewDialogOpen },
    onCloseMTViewDialog,
  } = useMonitoringToolsContext();

  const monitoringToolId = selectedMonitoringTool?.id ?? "";

  const { monitoringTool, isFetching } = useGetMonitoringTool(monitoringToolId);

  const { removeMonitoringTool } = useDeleteMonitoringTool();

  const closeConfirmDialog = () => setIsConfirmDialogOpen(false);

  const handleCloseDialog = () => {
    onCloseMTViewDialog();
    isEditingMode && setIsEditingMode(false);
  };

  const handleSwitchChange = () => {
    setIsEditingMode(isEditingMode);
    console.log("MonitoringToolViewDialog: isEditingMode:", isEditingMode);
  };

  const handleDeleteButtonClicked = () => setIsConfirmDialogOpen(true);

  return (
    <>
      <MaqasidDialog
        isOpen={isMTViewDialogOpen}
        onClose={handleCloseDialog}
        variant="right"
      >
        <MaqasidDialog.Header>
          {isFetching ? (
            <Typography variant="h3" width={"50%"}>
              <Skeleton />
            </Typography>
          ) : (
            <MaqasidDialog.Title flex={1} title={monitoringTool?.name} />
          )}
          <MaqasidDialog.Actions>
            {/* <Chip label="View" /> */}
            <FormControlLabel
              sx={{ mr: 0, p: 1 }}
              control={<Switch onChange={handleSwitchChange} />}
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

        {isFetching ? (
          <MaqasidDialog.Body>
            <DialogSkeleton />
          </MaqasidDialog.Body>
        ) : (
          monitoringTool && (
            <DialogBodyAndFooter monitoringTool={monitoringTool} />
          )
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
