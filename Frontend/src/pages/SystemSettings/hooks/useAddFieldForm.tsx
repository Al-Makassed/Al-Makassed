import { useFormik } from "formik";
// import fieldValidationSchema from "../schema";
import { FieldInitialValues } from "../constants";
import { getField } from "../API/type";
import useAddFieldAPI from "./useAddFieldAPI";

const useAddFieldForm = () => {
  const { isPending, addNewField } = useAddFieldAPI();

  const submitForm = (values: getField) => {
    addNewField(values.content);
  };

  const formikProps = useFormik({
    initialValues: FieldInitialValues,
    // validationSchema : fieldValidationSchema,
    onSubmit: submitForm,
  });

  return { formikProps, isPending };
};

export default useAddFieldForm;
