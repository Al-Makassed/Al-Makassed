import React, { FC, useEffect } from "react";
import TextField from "src/components/Fields/TextField";
import { AddChapterDialogProps } from "../types";
import AddIcon from "@mui/icons-material/Add";
import MaqasidDialog from "src/components/MaqasidDialog";
import useAddChapterForm from "../hooks/useAddChapterForm";
import { Form, FormikProvider } from "formik";
import { LoadingButton } from "@mui/lab";

const AddChapterDialog: FC<AddChapterDialogProps> = ({ onClose, open }) => {
  const { formikProps, isAdding, status } = useAddChapterForm();

  const { dirty, isValid, resetForm, submitForm } = formikProps;

  const handleSubmitForm = async () => {
    await submitForm();
    resetForm();
  };

  const handleCloseDialog = () => onClose();

  useEffect(() => {
    if (!isAdding && status === "success") {
      handleCloseDialog();
    }
  }, [isAdding]);

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
            <MaqasidDialog.Title title="Add Chapter" />
            <MaqasidDialog.Actions>
              <MaqasidDialog.Close />
            </MaqasidDialog.Actions>
          </MaqasidDialog.Header>
          <MaqasidDialog.Body niceScroll>
            <TextField
              label="Chapter Name"
              placeholder="e.g. International Patient Safety Goals"
              name="chapterName"
            />{" "}
          </MaqasidDialog.Body>

          <MaqasidDialog.Footer>
            <LoadingButton
              onClick={handleSubmitForm}
              type="submit"
              disabled={!dirty || !isValid}
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              aria-label="Add Chapter"
              loading={isAdding}
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
export default AddChapterDialog;
