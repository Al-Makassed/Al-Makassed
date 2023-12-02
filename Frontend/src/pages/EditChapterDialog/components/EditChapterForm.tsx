import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LoadingButton from "@mui/lab/LoadingButton";
import { FormikProvider } from "formik";
import { FC } from "react";
import TextField from "src/components/Fields/TextField";
import { Chapter } from "../API/types";
import useRenameChapterForm from "../hooks/useRenameChapterForm";

interface EditChapterFormProps {
  chapter: Chapter;
}

const EditChapterForm: FC<EditChapterFormProps> = ({ chapter }) => {
  const { formikProps, isRenaming } = useRenameChapterForm(chapter);

  const { dirty, isValid, submitForm } = formikProps;

  return (
    <FormikProvider value={formikProps}>
      <TextField label="Chapter Name" name="newChapterName" />

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
        Rename Chapter
      </LoadingButton>
    </FormikProvider>
  );
};

export default EditChapterForm;
