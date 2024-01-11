import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LoadingButton from "@mui/lab/LoadingButton";
import { FormikProvider } from "formik";
import { FC, useEffect } from "react";
import TextField from "src/components/Fields/TextField";
import { Chapter } from "../API/types";
import useRenameChapterForm from "../hooks/useRenameChapterForm";
import { Stack } from "@mui/material";

interface EditChapterFormProps {
  chapter: Chapter;
}

const EditChapterForm: FC<EditChapterFormProps> = ({ chapter }) => {
  const { formikProps, isRenaming } = useRenameChapterForm(chapter);

  const { dirty, isValid, submitForm, resetForm } = formikProps;

  useEffect(() => {
    if (isRenaming) return;
    resetForm();
  }, [isRenaming]);

  return (
    <FormikProvider value={formikProps}>
      <Stack gap={2}>
        <TextField label="Chapter Name" name="newChapterName" />

        <LoadingButton
          loading={isRenaming}
          disabled={!dirty || !isValid}
          loadingPosition="start"
          size="small"
          type="submit"
          variant="contained"
          aria-label="Forgot"
          onClick={submitForm}
          sx={{ width: "fit-content", textTransform: "none", px: 2 }}
          startIcon={<DriveFileRenameOutlineIcon />}
        >
          Rename Chapter
        </LoadingButton>
      </Stack>
    </FormikProvider>
  );
};

export default EditChapterForm;
