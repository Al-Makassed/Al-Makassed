import { AddPolicyDependencyDialogProps } from "../types";
import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { Form, FormikProvider } from "formik";
import { FC, useEffect } from "react";
import FileDropzoneField from "src/components/Fields/FileDropzoneField";
import TextField from "src/components/Fields/TextField";
import MaqasidDialog from "src/components/MaqasidDialog";
import usePostDependencyForm from "../hooks/usePostDependencyForm";

const AddPolicyDependencyDialog: FC<AddPolicyDependencyDialogProps> = ({
  onClose,
  open,
  chapterId,
  policyId,
  type,
}) => {
  const { formikProps, isAddingDependency } = usePostDependencyForm(
    chapterId,
    policyId,
    type,
  );

  const { dirty, isValid, resetForm, submitForm } = formikProps;

  const handleSubmitForm = async () => {
    await submitForm();
    resetForm();
  };

  useEffect(() => {
    if (!isAddingDependency) {
      handleCloseDialog();
    }
  }, [isAddingDependency]);

  const handleCloseDialog = () => onClose();

  return (
    <>
      <FormikProvider value={formikProps}>
        <Form>
          <MaqasidDialog
            isOpen={open}
            onClose={handleCloseDialog}
            onClosed={() => resetForm()}
            disableBackdropClick
            disableEscapeKeyDown
            // variant="right"
          >
            <MaqasidDialog.Header>
              <MaqasidDialog.Title title="Add Dependency" />
              <MaqasidDialog.Actions>
                <MaqasidDialog.Fullscreen />
                <MaqasidDialog.Close />
              </MaqasidDialog.Actions>
            </MaqasidDialog.Header>
            <MaqasidDialog.Body niceScroll>
              <FormikProvider value={formikProps}>
                <Stack p={3} gap={2.5} justifyContent="center">
                  <TextField
                    name="name"
                    label="Dependency Name"
                    placeholder="e.g. "
                  />

                  <TextField
                    name="code"
                    label="Dependency Code"
                    placeholder="e.g. P120"
                  />

                  <TextField
                    name="estimatedTime"
                    label="Time in minutes"
                    placeholder="e.g. 25"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                  />

                  <FileDropzoneField name="mainFile" />
                </Stack>
              </FormikProvider>
            </MaqasidDialog.Body>
            <MaqasidDialog.Footer>
              <LoadingButton
                onClick={handleSubmitForm}
                type="submit"
                disabled={!dirty || !isValid}
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                aria-label="Add policy"
                loading={isAddingDependency}
                loadingPosition="start"
              >
                Add
              </LoadingButton>
            </MaqasidDialog.Footer>
          </MaqasidDialog>
        </Form>
      </FormikProvider>
    </>
  );
};

export default AddPolicyDependencyDialog;
