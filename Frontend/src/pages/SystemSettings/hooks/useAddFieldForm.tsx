import { useFormik } from "formik";
import { CreateFieldRequest } from "../API/type";
import { FieldInitialValues } from "../constants";
import { fieldValidationSchema } from "../schema";
import useAddFieldAPI from "./useAddFieldAPI";

const useAddFieldForm = () => {
  const { isPending, addNewField } = useAddFieldAPI();

  const submitForm = (values: CreateFieldRequest) => {
    addNewField({ content: values.content, categoryId: values.categoryId });
  };

  const formikProps = useFormik({
    initialValues: FieldInitialValues,
    validationSchema: fieldValidationSchema,
    onSubmit: submitForm,
  });

  return { formikProps, isPending };
};

export default useAddFieldForm;
