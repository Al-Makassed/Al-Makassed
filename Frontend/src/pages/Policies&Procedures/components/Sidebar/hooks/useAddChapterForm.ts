import { useFormik } from "formik";
import validationSchema from "../schema";
import { initialValues } from "../constants";
import { AddChapterProps } from "../types";
import useAddChapterAPI from "./useAddChapterAPI";
("./use");

const useAddChapterForm = () => {
  const { addNewChapter, isAdding, status } = useAddChapterAPI();

  const submitForm = (values: AddChapterProps) => {
    addNewChapter(values.chapterName);
  };

  const formikProps = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitForm,
  });

  return { formikProps, isAdding, status };
};

export default useAddChapterForm;
