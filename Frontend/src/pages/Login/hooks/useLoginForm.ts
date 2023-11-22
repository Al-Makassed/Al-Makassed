import { useFormik } from "formik";
import { INITIAL_VALUES } from "../constants";
import validationSchema from "../schema";
import { LoginFormPayload } from "../types";
import useLoginAPI from "./useLoginAPI";

const useLoginForm = () => {
  const { loginUser } = useLoginAPI();

  const submitForm = (values: LoginFormPayload) => {
    const { userId, password } = values;
    return loginUser({ userId, password });
  };

  const formikProps = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema,
    onSubmit: submitForm,
  });

  return formikProps;
};

export default useLoginForm;
