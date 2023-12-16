import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import { FC } from "react";
import MaqasidDialog from "src/components/MaqasidDialog";
import useMonitoringToolsContext from "src/pages/MonitoringTools/context/useMonitoringToolsContext";
import { DialogName } from "../constants";
import useMonitoringToolDialogContext from "../context/useMonitoringToolDialogContext";
import useAssignMonitoringToolToDepartment from "../hooks/useAssignMonitoringToolToDepartment";

const AssignDepartmentDialog: FC = () => {
  const { assignDepartments, isPending } =
    useAssignMonitoringToolToDepartment();

  const {
    state: { openedDialog },
    onCloseDialog,
  } = useMonitoringToolDialogContext();

  const {
    state: { selectedMonitoringTool },
  } = useMonitoringToolsContext();

  const handleCloseDialog = () => onCloseDialog();

  const handleSubmit = (departmentsIdes: string[]) => {
    assignDepartments({
      monitoringToolId: selectedMonitoringTool!.id,
      departmentsIdes,
    });
  };

  return (
    <MaqasidDialog
      isOpen={openedDialog === DialogName.AssignDepartment}
      onClose={handleCloseDialog}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <MaqasidDialog.Header>
        <MaqasidDialog.Title title="Assign Departments" />
        <MaqasidDialog.Actions>
          <MaqasidDialog.Fullscreen />
          <MaqasidDialog.Close />
        </MaqasidDialog.Actions>
      </MaqasidDialog.Header>
      <MaqasidDialog.Body>
        {/* //TODO: here will go the auto complete after MAK-87 is merged */}
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
          aria-label="Assign Departments"
          loading={isPending}
          loadingPosition="start"
        >
          Add
        </LoadingButton>
      </MaqasidDialog.Footer>
    </MaqasidDialog>
  );
};

export default AssignDepartmentDialog;
