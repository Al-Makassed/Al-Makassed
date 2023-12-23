import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LoadingButton from "@mui/lab/LoadingButton";
import { FormikProvider } from "formik";
import { FC, useEffect } from "react";
import TextField from "src/components/Fields/TextField";
import { Department } from "../API/type";
import MaqasidDialog from "src/components/MaqasidDialog";
import useEditDepartmentForm from "../hooks/useEditDepartmentForm";
// import AutocompleteField from "src/components/Fields/AutocompleteField";
import { Stack } from "@mui/material";

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
  const { formikProps, isRenaming } = useEditDepartmentForm(department);

  // const { focalPoints } = useGetFocalPoint();

  const handleDiscard = () => {
    onClose();
  };

  const handleSave = () => {
    submitForm();
    onClose();
  };

  const { dirty, isValid, submitForm, resetForm } = formikProps;

  useEffect(() => {
    if (isRenaming) return;
    resetForm();
  }, [isRenaming]);

  return (
    <>
      <MaqasidDialog
        isOpen={open}
        onClose={onClose}
        // variant="right"
      >
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

              <TextField label="headId" name="headId" />

              {/* <AutocompleteField
              name="departments"
              label="Departments"
              multiple
              disablePortal
              id="departments-autocomplete"
              options={focalPoints}
              getOptionLabel={(option) => (option as Department).name}
              onChange={(event, value) => {
                const values = value as Department[];
                const departmentsIds = values.map((item) => item.id);
                setFieldValue("departmentsIdes", departmentsIds);
              }}
            /> */}
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
