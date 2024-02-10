import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LoadingButton from "@mui/lab/LoadingButton";
import { FormikProvider } from "formik";
import { FC, useEffect } from "react";
import { User } from "../API/type";
import MaqasidDialog from "src/components/MaqasidDialog";
import useEditUserRoleForm from "../hooks/useEditUserRoleForm";
import { Stack } from "@mui/material";
import { Role, role } from "../types";
import AutocompleteField from "src/components/Fields/AutocompleteField";

interface EditUserDialogProps {
  user: User;
  open: boolean;
  onClose: () => void;
}

const EditUserDialog: FC<EditUserDialogProps> = ({ user, open, onClose }) => {
  if (user == null) return null;

  const { formikProps, isRenaming } = useEditUserRoleForm(user);

  const { dirty, isValid, submitForm, resetForm, setFieldValue } = formikProps;

  useEffect(() => {
    if (isRenaming) return;
    resetForm();
  }, [isRenaming]);

  const handleDiscard = () => {
    resetForm();
    onClose();
  };

  const handleSave = () => {
    submitForm();
    onClose();
  };

  const handleSubmit = () => {
    submitForm();
    onClose();
  };

  return (
    <>
      <MaqasidDialog isOpen={open} onClose={onClose}>
        <MaqasidDialog.Header>
          <MaqasidDialog.Title title="Edit User Role" />
          <MaqasidDialog.Actions>
            <MaqasidDialog.Fullscreen />
            <MaqasidDialog.Close />
          </MaqasidDialog.Actions>
        </MaqasidDialog.Header>
        <FormikProvider value={formikProps}>
          <MaqasidDialog.Body niceScroll>
            <Stack>
              <AutocompleteField
                name="roles"
                label="ٌRoles"
                id="roles-autocomplete"
                defaultValue={null}
                options={role}
                getOptionLabel={(option) => (option as Role).name}
                onChange={(event, value) => {
                  setFieldValue("roles", value);
                }}
              />
            </Stack>
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
              onClick={handleSubmit}
              startIcon={<DriveFileRenameOutlineIcon />}
            >
              change userRole
            </LoadingButton>
          </MaqasidDialog.Footer>
        </FormikProvider>
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

export default EditUserDialog;
