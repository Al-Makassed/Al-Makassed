import React, { FC } from "react";
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
import DialogBodyAndFooter from "./components/DialogViewBody";
import useMonitoringToolDialogContext from "./context/useMonitoringToolDialogContext";

const MonitoringToolViewDialog: FC = () => {
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

  const handleCloseDialog = () => {
    onCloseMTViewDialog();
    isEditingMode && setIsEditingMode(false);
  };

  const handleSwitchChange = () => {
    setIsEditingMode(isEditingMode);
    console.log("MonitoringToolViewDialog: isEditingMode:", isEditingMode);
  };

  const handleDeleteMonitoringTool = () =>
    removeMonitoringTool(monitoringToolId);

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
                onClick={handleDeleteMonitoringTool}
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
    </>
  );
};

export default MonitoringToolViewDialog;
