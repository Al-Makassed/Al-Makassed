import { useFormik } from "formik";
import { INITIAL_VALUES } from "../constants";
import validationSchema from "../schema";
import { SignupFormPayload } from "../types";
import useSignUpAPI from "./useSignUpAPI";

const useSignupForm = () => {
  const { signupUser } = useSignUpAPI();

  const submitForm = (values: SignupFormPayload) => {
    const { userId, userName, fullName, email, roles, departmentId, password } =
      values;
    return signupUser({
      userId,
      userName,
      fullName,
      email,
      roles,
      departmentId,
      password,
    });
  };

  const formikProps = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema,
    onSubmit: submitForm,
  });

  return formikProps;
};

export default useSignupForm;
