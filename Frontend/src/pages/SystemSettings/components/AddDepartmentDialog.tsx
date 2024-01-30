import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { Form, FormikProvider } from "formik";
import { FC, useEffect } from "react";
import TextField from "src/components/Fields/TextField";
import MaqasidDialog from "src/components/MaqasidDialog";

import { AddDepartmentDialogProps } from "../types";
import useAddDepartmentForm from "../hooks/useAddDepartmentForm";

const AddDepartmentDialog: FC<AddDepartmentDialogProps> = ({
  onClose,
  open,
}) => {
  const { formikProps, isPending } = useAddDepartmentForm();

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
          disableBackdropClick
          disableEscapeKeyDown
          // variant="right"
        >
          <MaqasidDialog.Header>
            <MaqasidDialog.Title title="Add Department" />
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
                  label="Department Name"
                  placeholder="e.g. Hand Hygiene Policy"
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

export default AddDepartmentDialog;
