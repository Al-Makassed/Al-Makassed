import React, { FC } from "react";
import { Stack } from "@mui/material";
import { AddPolicyProps } from "./types";
import AddIcon from "@mui/icons-material/Add";
import useAddPolicyForm from "./hooks/useAddPolicyForm";
import TextField from "src/components/Fields/TextField";
import { LoadingButton } from "@mui/lab";
import MaqasidDialog from "src/components/MaqasidDialog";
import { FormikProvider, Form } from "formik";
import FileDropzone from "./components/FileDropzone";

const AddPolicy: FC<AddPolicyProps> = ({ onClose, open, chapterId }) => {
  const formikProps = useAddPolicyForm(chapterId);

  const { dirty, isValid, isSubmitting, resetForm, handleSubmit, submitForm } =
    formikProps;

  const handleCloseDialog = () => onClose();

  return (
    <MaqasidDialog
      isOpen={open}
      onClose={handleCloseDialog}
      onClosed={() => resetForm()}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <FormikProvider value={formikProps}>
        <Form onSubmit={handleSubmit}>
          <MaqasidDialog.Header>
            <MaqasidDialog.Title title="Add Policy" />
            <MaqasidDialog.Actions>
              <MaqasidDialog.Fullscreen />
              <MaqasidDialog.Close />
            </MaqasidDialog.Actions>
          </MaqasidDialog.Header>
          <MaqasidDialog.Body>
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
                  label="Time in (min)"
                  placeholder="e.g. 25"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                />

                <FileDropzone />

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
              onClick={submitForm}
              type="submit"
              disabled={!dirty || !isValid}
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              aria-label="Add policy"
              loading={isSubmitting}
              loadingPosition="start"
            >
              Add
            </LoadingButton>
          </MaqasidDialog.Footer>
        </Form>
      </FormikProvider>
    </MaqasidDialog>
  );
};

export default AddPolicy;
