import { useFormik } from "formik";
import { getField } from "../API/type";
import { FieldInitialValues } from "../constants";
import { fieldValidationSchema } from "../schema";
import useAddFieldAPI from "./useAddFieldAPI";

const useAddFieldForm = () => {
  const { isPending, addNewField } = useAddFieldAPI();

  const submitForm = (values: getField) => {
    addNewField(values.content);
  };

  const formikProps = useFormik({
    initialValues: FieldInitialValues,
    validationSchema: fieldValidationSchema,
    onSubmit: submitForm,
  });

  return { formikProps, isPending };
};

export default useAddFieldForm;
