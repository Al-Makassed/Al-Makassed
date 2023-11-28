import React, { FC, useEffect } from "react";
import { AddFieldDialogProps } from "../types";
import useAddFieldForm from "../hooks/useAddFieldForm";
import { Form, FormikProvider } from "formik";
import MaqasidDialog from "src/components/MaqasidDialog";
import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import TextField from "src/components/Fields/TextField";
import AddIcon from "@mui/icons-material/Add";

const AddFieldDialog: FC<AddFieldDialogProps> = ({ open, onClose }) => {
  const { formikProps, isPending, status } = useAddFieldForm();

  const { dirty, isValid, resetForm, submitForm } = formikProps;

  const handleCloseDialog = () => onClose();

  const handleSubmitForm = () => {
    submitForm();
  };

  useEffect(() => {
    if (!isPending && status === "success") {
      handleCloseDialog();
    }
  }, [isPending]);

  return (
    <FormikProvider value={formikProps}>
      <Form>
        <MaqasidDialog
          isOpen={open}
          onClose={handleCloseDialog}
          onClosed={() => resetForm()}
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
            <FormikProvider value={formikProps}>
              <Stack p={5} justifyContent="center">
                <TextField
                  name="content"
                  label="Field Content (Question)"
                  placeholder="e.g. Is the bracelet clear and available?"
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
              aria-label="Add Field"
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

export default AddFieldDialog;
