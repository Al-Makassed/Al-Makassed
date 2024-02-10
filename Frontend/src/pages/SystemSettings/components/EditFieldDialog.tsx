import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LoadingButton from "@mui/lab/LoadingButton";
import { FormikProvider } from "formik";
import { FC, useEffect } from "react";
import TextField from "src/components/Fields/TextField";
import { Field } from "../API/type";
import MaqasidDialog from "src/components/MaqasidDialog";
import useEditFieldForm from "../hooks/useEditFieldForm";
// import AutocompleteField from "src/components/Fields/AutocompleteField";
import { Stack } from "@mui/material";

interface EditFieldDialogProps {
  field: Field;
  open: boolean;
  onClose: () => void;
}

const EditFieldDialog: FC<EditFieldDialogProps> = ({
  field,
  open,
  onClose,
}) => {
  if (field == null) return null;
  const { formikProps, isRenaming } = useEditFieldForm(field);

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
          <MaqasidDialog.Title title="Edit Field" />
          <MaqasidDialog.Actions>
            <MaqasidDialog.Fullscreen />
            <MaqasidDialog.Close />
          </MaqasidDialog.Actions>
        </MaqasidDialog.Header>
        <MaqasidDialog.Body niceScroll>
          <FormikProvider value={formikProps}>
            <Stack>
              <TextField label="Field Name" name="content" />
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
            Rename Field
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

export default EditFieldDialog;
