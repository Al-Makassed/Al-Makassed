import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import { FormikProvider } from "formik";
import { FC } from "react";
import MaqasidDialog from "src/components/MaqasidDialog";
import { MonitoringToolsDialog } from "../MonitoringTools/constants";
import useMonitoringToolsContext from "../MonitoringTools/context/useMonitoringToolsContext";
import AddMonitoringToolsForm from "./AddMonitoringToolsForm";
import useAddMonitoringToolForm from "./hooks/useAddMonitoringToolForm";

const AddMonitoringToolDialog: FC = () => {
  const {
    state: { openedDialog },
    onCloseDialog,
  } = useMonitoringToolsContext();

  const { formikProps, isAdding } = useAddMonitoringToolForm();

  const { dirty, isValid, resetForm, submitForm } = formikProps;

  const handleSubmitForm = async () => {
    await submitForm();
    resetForm();
  };

  return (
    <MaqasidDialog
      isOpen={openedDialog === MonitoringToolsDialog.AddMonitoringTool}
      onClose={onCloseDialog}
      onClosed={() => resetForm()}
      disableBackdropClick={dirty}
      disableEscapeKeyDown={dirty}
      variant="right"
      maxWidth="md"
    >
      <MaqasidDialog.Header>
        <MaqasidDialog.Title title="Add Monitoring Tool" />
        <MaqasidDialog.Actions>
          <MaqasidDialog.Fullscreen />
          <MaqasidDialog.Close />
        </MaqasidDialog.Actions>
      </MaqasidDialog.Header>

      <FormikProvider value={formikProps}>
        <MaqasidDialog.Body>
          <AddMonitoringToolsForm />
        </MaqasidDialog.Body>

        <MaqasidDialog.Footer>
          <LoadingButton
            onClick={handleSubmitForm}
            type="submit"
            disabled={!dirty || !isValid}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            aria-label="Add MT"
            loading={isAdding}
            loadingPosition="start"
          >
            Add
          </LoadingButton>
        </MaqasidDialog.Footer>
      </FormikProvider>
    </MaqasidDialog>
  );
};

export default AddMonitoringToolDialog;
