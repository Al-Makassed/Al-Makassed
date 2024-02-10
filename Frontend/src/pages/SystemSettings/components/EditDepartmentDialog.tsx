import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LoadingButton from "@mui/lab/LoadingButton";
import { Stack } from "@mui/material";
import { FormikProvider } from "formik";
import { FC, useEffect } from "react";
import TextField from "src/components/Fields/TextField";
import MaqasidDialog from "src/components/MaqasidDialog";
import { Department } from "../API/type";
import useEditDepartmentForm from "../hooks/useEditDepartmentForm";

interface EditDepartmentDialogProps {
  department: Department;
  open: boolean;
  onClose: () => void;
}

const EditDepartmentDialog: FC<EditDepartmentDialogProps> = ({
  department,
  onClose,
  open,
}) => {
  if (department == null) return null;

  const { formikProps, isRenaming } = useEditDepartmentForm(department);

  const { dirty, isValid, submitForm, resetForm } = formikProps;

  useEffect(() => {
    if (isRenaming) return;
    resetForm();
  }, [isRenaming]);

  const handleDiscard = () => onClose();

  const handleSave = () => {
    submitForm();
    onClose();
  };

  return (
    <>
      <MaqasidDialog isOpen={open} onClose={onClose}>
        <MaqasidDialog.Header>
          <MaqasidDialog.Title title="Edit Department" />
          <MaqasidDialog.Actions>
            <MaqasidDialog.Fullscreen />
            <MaqasidDialog.Close />
          </MaqasidDialog.Actions>
        </MaqasidDialog.Header>
        <MaqasidDialog.Body niceScroll>
          <FormikProvider value={formikProps}>
            <Stack gap={2}>
              <TextField label="Department Name" name="name" />
              <TextField disabled label="headId" name="headId" />
            </Stack>
          </FormikProvider>
        </MaqasidDialog.Body>

        <MaqasidDialog.Footer>
          <LoadingButton
            loading={isRenaming}
            disabled={!dirty || !isValid}
            loadingPosition="start"
            size="medium"
            type="submit"
            variant="contained"
            aria-label="Forgot"
            onClick={submitForm}
            startIcon={<DriveFileRenameOutlineIcon />}
          >
            Rename Department
          </LoadingButton>
        </MaqasidDialog.Footer>

        <MaqasidDialog.SaveChangesConfirmationDialog
          isDirty={dirty}
          cancelProps={{
            label: "Cancel",
          }}
          closeAndDiscardProps={{
            label: "Discard",
            onClick: handleDiscard,
          }}
          saveAndCloseProps={{
            label: "Save",
            onClick: handleSave,
          }}
        />
      </MaqasidDialog>
    </>
  );
};

export default EditDepartmentDialog;
