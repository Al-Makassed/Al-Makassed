import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LoadingButton from "@mui/lab/LoadingButton";
import { FormikProvider } from "formik";
import { FC, useEffect } from "react";
import { User } from "../API/type";
import MaqasidDialog from "src/components/MaqasidDialog";
import useEditUserDepartmentForm from "../hooks/useEditUserDepartmentForm";
import { Stack } from "@mui/material";
import AutocompleteField from "src/components/Fields/AutocompleteField";
import useGetDepartments from "../hooks/useGetDepartments";
import { Department } from "../API/type";

interface EditUserDepartmentDialogProps {
  userDepartment: User;
  open: boolean;
  onClose: () => void;
}

const EditUserDepartmentDialog: FC<EditUserDepartmentDialogProps> = ({
  userDepartment,
  open,
  onClose,
}) => {
  if (userDepartment == null) return null;
  const { formikProps, isRenaming } = useEditUserDepartmentForm(userDepartment);

  const { departments } = useGetDepartments();

  const handleDiscard = () => {
    onClose();
  };

  const handleSave = () => {
    submitForm();
    onClose();
  };

  const { dirty, isValid, submitForm, resetForm, setFieldValue } = formikProps;

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
          <MaqasidDialog.Title title="Edit UserDepartment" />
          <MaqasidDialog.Actions>
            <MaqasidDialog.Fullscreen />
            <MaqasidDialog.Close />
          </MaqasidDialog.Actions>
        </MaqasidDialog.Header>
        <MaqasidDialog.Body niceScroll>
          <FormikProvider value={formikProps}>
            <Stack>
              {/* <AutocompleteField
                name="roles"
                label="roles"
                disablePortal
                id="role-autocomplete"
                options={role}
                getOptionLabel={(option) => (option as Role).name}
                onChange={(event, value) => {
                  setFieldValue("roles", [(value as Role).name]);
                }}
              /> */}
              <AutocompleteField
                name="departments"
                label="Departments"
                disablePortal
                id="departments-autocomplete"
                options={departments}
                getOptionLabel={(option) => (option as Department).name}
                onChange={(event, value) => {
                  setFieldValue("departmentId", (value as Department).id);
                }}
              />
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
            change user department
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

export default EditUserDepartmentDialog;
