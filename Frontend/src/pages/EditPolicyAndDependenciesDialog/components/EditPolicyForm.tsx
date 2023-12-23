import { FC, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { FormikProvider } from "formik";
import FileDropzoneField from "src/components/Fields/FileDropzoneField";
import TextField from "src/components/Fields/TextField";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import useUpdatePolicyForm from "../hooks/useUpdatePolicyForm";
import useGetPolicy from "../hooks/useGetPolicy";
import { EditPolicyFormProps } from "./types";

const EditPolicyForm: FC<EditPolicyFormProps> = ({
  chapterId,
  policyId,
  closeMainDialog,
}) => {
  const { policy } = useGetPolicy({ chapterId, policyId });

  const { formikProps, isUpdating, status } = useUpdatePolicyForm({
    chapterId,
    policy,
  });

  useEffect(() => {
    if (!isUpdating && status == "success") {
      closeMainDialog();
    }
  }, [isUpdating, status]);

  const { dirty, isValid, resetForm, submitForm } = formikProps;

  const handleSubmitForm = async () => {
    await submitForm();
    resetForm();
  };

  return (
    <FormikProvider value={formikProps}>
      <Stack gap={2.5} justifyContent="center">
        <TextField name="newName" label="Policy Name" />

        <TextField name="newCode" label="Policy Code" />

        <TextField
          name="newEstimatedTimeInMin"
          label="Time in minutes"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
        />

        <FileDropzoneField name="newMainFile" />

        <TextField name="newSummary" label="Summary" multiline />

        <LoadingButton
          fullWidth
          onClick={handleSubmitForm}
          type="submit"
          disabled={!dirty || !isValid}
          variant="contained"
          color="primary"
          startIcon={<DriveFileRenameOutlineIcon />}
          aria-label="Add policy"
          loading={isUpdating}
          loadingPosition="start"
        >
          Update
        </LoadingButton>
      </Stack>
    </FormikProvider>
  );
};

export default EditPolicyForm;
