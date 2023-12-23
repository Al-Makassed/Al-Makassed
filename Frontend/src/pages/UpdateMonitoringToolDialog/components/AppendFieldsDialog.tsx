import React, { FC } from "react";
import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import MaqasidDialog from "src/components/MaqasidDialog";
import useAddFieldToMonitoringTool from "../hooks/useAddFieldToMonitoringTool";
import useUpdateMonitoringToolContext from "../context/useUpdateMonitoringToolContext";
import useMonitoringToolsContext from "src/pages/MonitoringTools/context/useMonitoringToolsContext";
import { DialogName } from "../constants";

const AppendFieldsDialog: FC = () => {
  const { appendFieldToMT, isPending } = useAddFieldToMonitoringTool();

  const {
    state: { openedDialog },
    onCloseDialog,
  } = useUpdateMonitoringToolContext();

  const {
    state: { selectedMonitoringTool },
  } = useMonitoringToolsContext();

  const handleCloseDialog = () => onCloseDialog();

  const handleSubmit = (fieldsIdes: string[]) => {
    appendFieldToMT({
      monitoringToolId: selectedMonitoringTool!.id,
      fieldsIdes,
    });
  };

  return (
    <MaqasidDialog
      isOpen={openedDialog === DialogName.AppendField}
      onClose={handleCloseDialog}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <MaqasidDialog.Header>
        <MaqasidDialog.Title title="Append Field" />
        <MaqasidDialog.Actions>
          <MaqasidDialog.Fullscreen />
          <MaqasidDialog.Close />
        </MaqasidDialog.Actions>
      </MaqasidDialog.Header>
      <MaqasidDialog.Body>
        {/* // TODO: here will go the transfer list after MAK-87 is merged */}
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
          aria-label="Append Fields"
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
