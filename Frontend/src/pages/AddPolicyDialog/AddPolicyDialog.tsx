import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { Form, FormikProvider } from "formik";
import { FC, useEffect } from "react";
import FileDropzoneField from "src/components/Fields/FileDropzoneField";
import TextField from "src/components/Fields/TextField";
import MaqasidDialog from "src/components/MaqasidDialog";
import useAddPolicyForm from "./hooks/useAddPolicyForm";
import { AddPolicyDialogProps } from "./types";

const AddPolicyDialog: FC<AddPolicyDialogProps> = ({
  onClose,
  open,
  chapterId,
}) => {
  const { formikProps, isPending } = useAddPolicyForm(chapterId);

  const { dirty, isValid, resetForm, submitForm } = formikProps;

  const handleSubmitForm = async () => {
    await submitForm();
    resetForm();
  };

  useEffect(() => {
    if (!isPending) {
      handleCloseDialog();
    }
  }, [isPending]);
  const handleCloseDialog = () => onClose();

  return (
    <FormikProvider value={formikProps}>
      <Form>
        <MaqasidDialog
          isOpen={open}
          onClose={handleCloseDialog}
          onClosed={() => resetForm()}
          disableBackdropClick={dirty}
          disableEscapeKeyDown={dirty}
          // variant="right"
        >
          <MaqasidDialog.Header>
            <MaqasidDialog.Title title="Add Policy" />
            <MaqasidDialog.Actions>
              <MaqasidDialog.Fullscreen />
              <MaqasidDialog.Close />
            </MaqasidDialog.Actions>
          </MaqasidDialog.Header>
          <MaqasidDialog.Body niceScroll>
            <FormikProvider value={formikProps}>
              <Stack p={3} gap={2.5} justifyContent="center">
                <TextField
                  name="Name"
                  label="Policy Name"
                  placeholder="e.g. Hand Hygiene Policy"
                />

                <TextField
                  name="Code"
                  label="Policy Code"
                  placeholder="e.g. P120"
                />

                <TextField
                  name="EstimatedTimeInMin"
                  label="Time in minutes"
                  placeholder="e.g. 25"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                />

                <FileDropzoneField name="MainFile" />

                <TextField
                  name="Summary"
                  label="Summary"
                  placeholder="e.g. Here goes the description"
                />
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
              loading={isPending}
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

export default AddPolicyDialog;
