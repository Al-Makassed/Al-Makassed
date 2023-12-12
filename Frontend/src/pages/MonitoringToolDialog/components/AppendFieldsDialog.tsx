import React, { FC } from "react";
import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import MaqasidDialog from "src/components/MaqasidDialog";
import useAddFieldToMonitoringTool from "../hooks/useAddFieldToMonitoringTool";
import useMonitoringToolDialogContext from "../context/useMonitoringToolDialogContext";
import useMonitoringToolsContext from "src/pages/MonitoringTools/context/useMonitoringToolsContext";

const AppendFieldsDialog: FC = () => {
  const { appendFieldToMT, isPending } = useAddFieldToMonitoringTool();

  const {
    state: { isAppendFieldDialogOpen },
    onCloseAppendFieldDialog,
  } = useMonitoringToolDialogContext();

  const {
    state: { selectedMonitoringTool },
  } = useMonitoringToolsContext();

  const handleCloseDialog = () => onCloseAppendFieldDialog();

  const handleSubmit = (fieldsIdes: string[]) => {
    appendFieldToMT({
      monitoringToolId: selectedMonitoringTool!.id,
      fieldsIdes,
    });
  };

  return (
    <MaqasidDialog
      isOpen={isAppendFieldDialogOpen}
      onClose={handleCloseDialog}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <MaqasidDialog.Header>
        <MaqasidDialog.Title title="Add Field" />
        <MaqasidDialog.Actions>
          <MaqasidDialog.Fullscreen />
          <MaqasidDialog.Close />
        </MaqasidDialog.Actions>
      </MaqasidDialog.Header>
      <MaqasidDialog.Body>
        {/* TODO: here will go the transfer list after MAK-87 is merged */}
      </MaqasidDialog.Body>
      <MaqasidDialog.Footer>
        <LoadingButton
          // TODO: when dialog body is done, pass the list to the handler
          onClick={() => handleSubmit}
          type="submit"
          //disabled={!dirty || !isValid}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          aria-label="Add Field"
          loading={isPending}
          loadingPosition="start"
        >
          Add
        </LoadingButton>
      </MaqasidDialog.Footer>
    </MaqasidDialog>
  );
};

export default AppendFieldsDialog;
