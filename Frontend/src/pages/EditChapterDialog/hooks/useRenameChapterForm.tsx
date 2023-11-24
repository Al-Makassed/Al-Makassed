import { useFormik } from "formik";
import validationSchema from "../schema";
import { initialValues } from "../constants";
import { NewChapterName } from "../types";
import useRenameChapter from "./useRenameChapter";

const useRenameChapterForm = (chapterId: string) => {
  const { renameChapter, isRenaming } = useRenameChapter();

  const submitForm = (values: NewChapterName) => {
    renameChapter({
      newChapterName: values.newChapterName,
      id: chapterId,
    });
  };

  const formikProps = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitForm,
  });

  return { formikProps, isRenaming };
};

export default useRenameChapterForm;
