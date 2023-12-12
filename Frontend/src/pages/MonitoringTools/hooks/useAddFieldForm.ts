import useAddFieldAPI from "./useAddFieldAPI";
import { useFormik } from "formik";
import { initialValues } from "../constants";
import { CreateFieldRequest } from "../API/types";
import validationSchema from "../schema";

const useAddFieldForm = () => {
  const { addNewField, isPending, status } = useAddFieldAPI();

  const submitForm = (values: CreateFieldRequest) => {
    addNewField({ content: values.content });
  };

  const formikProps = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitForm,
  });

  return { formikProps, isPending, status };
};

export default useAddFieldForm;
