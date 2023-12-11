import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LoadingButton from "@mui/lab/LoadingButton";
import { FormikProvider } from "formik";
import { FC, useEffect } from "react";
import TextField from "src/components/Fields/TextField";
// import { Department } from "../API/type";
import MaqasidDialog from "src/components/MaqasidDialog";

interface EditDepartmentDialogProps {
  // department: Department;
  open: boolean;
  onClose: () => void;
}

const EditDepartmentDialog: FC<EditDepartmentDialogProps> = ({
  onClose,
  open,
}) => {
  const { formikProps, isRenaming } = useRenameDepartmentForm();

  const { dirty, isValid, submitForm, resetForm } = formikProps;

  useEffect(() => {
    if (isRenaming) return;
    resetForm();
  }, [isRenaming]);

  return (
    <MaqasidDialog isOpen={open} onClose={onClose} variant="right">
      <MaqasidDialog.Header>
        <MaqasidDialog.Title title="Edit Department" />
        <MaqasidDialog.Actions>
          <MaqasidDialog.Fullscreen />
          <MaqasidDialog.Close />
        </MaqasidDialog.Actions>
      </MaqasidDialog.Header>
      <MaqasidDialog.Body niceScroll>
        <FormikProvider value={formikProps}>
          <TextField label="Department Name" name="name" />

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
        </FormikProvider>
      </MaqasidDialog.Body>
    </MaqasidDialog>
  );
};

export default EditDepartmentDialog;
