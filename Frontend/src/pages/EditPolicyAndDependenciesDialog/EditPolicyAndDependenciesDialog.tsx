import React, { FC, useEffect } from "react";
import { Stack } from "@mui/material";
import TextField from "src/components/Fields/TextField";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { LoadingButton } from "@mui/lab";
import { FormikProvider, Form } from "formik";
import MaqasidDialog from "src/components/MaqasidDialog";
import useUpdatePolicyForm from "./hooks/useUpdatePolicyForm";
import FileDropzoneField from "src/components/Fields/FileDropzoneField";
import { EditPolicyFormProps } from "./components/types";
import EditDependencies from "./components/DependenciesList";
// import useGetPolicy from "./hooks/useGetPolicy";

const EditPolicyAndDependenciesDialog: FC<EditPolicyFormProps> = ({
  open,
  chapterId,
  policyId,
  onClose,
}) => {
  // const { policy } = useGetPolicy({ chapterId, policyId });// pass this to initialValues

  const { formikProps, isUpdating } = useUpdatePolicyForm(chapterId, policyId);

  const { dirty, isValid, resetForm, submitForm } = formikProps;

  const handleSubmitForm = async () => {
    await submitForm();
    resetForm();
  };

  useEffect(() => {
    if (!isUpdating) {
      handleCloseDialog();
    }
  }, [isUpdating]);

  const handleCloseDialog = () => onClose();

  return (
    <FormikProvider value={formikProps}>
      <Form>
        <MaqasidDialog
          isOpen={open}
          onClose={handleCloseDialog}
          onClosed={() => resetForm()}
          disableBackdropClick
          disableEscapeKeyDown
          variant="right"
        >
          <MaqasidDialog.Header>
            <MaqasidDialog.Title title="Edit Policy" />
            <MaqasidDialog.Actions>
              <MaqasidDialog.Fullscreen />
              <MaqasidDialog.Close />
            </MaqasidDialog.Actions>
          </MaqasidDialog.Header>
          <MaqasidDialog.Body niceScroll>
            <FormikProvider value={formikProps}>
              <Stack p={3} gap={2.5} justifyContent="center">
                <TextField name="newName" label="Policy Name" />

                <TextField name="newCode" label="Policy Code" />

                <TextField
                  name="newEstimatedTimeInMin"
                  label="Time in minutes"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                />

                <FileDropzoneField name="newMainFile" />

                <TextField name="newSummary" label="Summary" />
              </Stack>
            </FormikProvider>
            <EditDependencies />
          </MaqasidDialog.Body>
          <MaqasidDialog.Footer>
            <LoadingButton
              onClick={handleSubmitForm}
              type="submit"
              disabled={!dirty || !isValid}
              variant="contained"
              color="primary"
              startIcon={<DriveFileRenameOutlineIcon />}
              aria-label="Add policy"
              loading={isUpdating}
              loadingPosition="start"
            >
              Add
            </LoadingButton>
          </MaqasidDialog.Footer>
        </MaqasidDialog>
      </Form>
    </FormikProvider>
  );
};

export default EditPolicyAndDependenciesDialog;
