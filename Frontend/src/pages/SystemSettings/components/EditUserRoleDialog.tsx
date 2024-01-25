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
  userRole: User;
  open: boolean;
  onClose: () => void;
}

const EditUserDialog: FC<EditUserDialogProps> = ({
  userRole,
  open,
  onClose,
}) => {
  if (userRole == null) return null;

  const { formikProps, isRenaming } = useEditUserRoleForm(userRole);

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
        <MaqasidDialog.Body niceScroll>
          <FormikProvider value={formikProps}>
            <Stack>
              <AutocompleteField
                name="roles"
                label="roles"
                disablePortal
                id="role-autocomplete"
                options={role}
                getOptionLabel={(option) => (option as Role).name}
                onChange={(event, value) => {
                  setFieldValue("roles", [(value as Role).name]);
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
            change userRole
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

export default EditUserDialog;
