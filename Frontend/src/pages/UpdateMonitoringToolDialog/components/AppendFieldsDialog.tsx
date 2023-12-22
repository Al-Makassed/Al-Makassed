import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import { Form, FormikProvider, useFormikContext } from "formik";
import { FC } from "react";
import MaqasidDialog from "src/components/MaqasidDialog";
import TransferList from "src/components/TransferList";
import useMonitoringToolsContext from "src/pages/MonitoringTools/context/useMonitoringToolsContext";
import { DialogName } from "../constants";
import useUpdateMonitoringToolContext from "../context/useUpdateMonitoringToolContext";
import useAddFieldToMonitoringToolForm from "../hooks/useAddFieldToMonitoringToolForm";
import useGetFields from "../hooks/useGetFields";
import { AddFieldsToMTFormPayload, AppendFieldsDialogProps } from "../types";

const AppendFieldsDialog: FC<AppendFieldsDialogProps> = ({ existedFields }) => {
  const { setFieldValue } = useFormikContext<AddFieldsToMTFormPayload>();

  const {
    state: { openedDialog },
    onCloseDialog,
  } = useUpdateMonitoringToolContext();

  const {
    state: { selectedMonitoringTool },
  } = useMonitoringToolsContext();

  const { formikProps, isAdding } = useAddFieldToMonitoringToolForm(
    selectedMonitoringTool!.id,
  );

  const { submitForm, dirty, isValid, errors } = formikProps;

  console.log(errors);

  const { fields: allFields } = useGetFields();

  // get the fields that are not already added to the monitoring tool.
  const selectableFields = allFields?.filter(
    (field) => !existedFields?.find((f) => f.id === field.id),
  );

  const handleCloseDialog = () => onCloseDialog();

  const handleSubmit = () => {
    submitForm();
    onCloseDialog();
  };

  return (
    <MaqasidDialog
      isOpen={openedDialog === DialogName.AppendField}
      onClose={handleCloseDialog}
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="md"
    >
      <MaqasidDialog.Header>
        <MaqasidDialog.Title title="Append Field" />
        <MaqasidDialog.Actions>
          <MaqasidDialog.Fullscreen />
          <MaqasidDialog.Close />
        </MaqasidDialog.Actions>
      </MaqasidDialog.Header>

      <FormikProvider value={formikProps}>
        <MaqasidDialog.Body>
          <Form>
            <TransferList
              // left={allFields}
              left={selectableFields}
              getOptionLabel={(option) => option.content}
              loading={!allFields || allFields.length === 0}
              onTransfer={(left, right) => {
                const rightIds = right.map((item) => item.id);
                setFieldValue("fieldsIdes", rightIds);
              }}
            />
          </Form>
        </MaqasidDialog.Body>
        <MaqasidDialog.Footer>
          <LoadingButton
            onClick={handleSubmit}
            type="submit"
            disabled={!dirty || !isValid}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            aria-label="Append Fields"
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

export default AppendFieldsDialog;
