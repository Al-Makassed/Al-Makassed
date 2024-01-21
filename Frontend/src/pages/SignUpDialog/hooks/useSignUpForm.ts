import { useFormik } from "formik";
import { INITIAL_VALUES } from "../constants";
import validationSchema from "../schema";
import { SignupFormPayload } from "../types";
import useSignUpAPI from "./useSignUpAPI";

const useSignupForm = () => {
  const { signupUser } = useSignUpAPI();

  const submitForm = (values: SignupFormPayload) => {
    const {
      userId,
      userName,
      firstName,
      lastName,
      email,
      roles,
      departmentId,
      password,
    } = values;
    return signupUser({
      userId,
      userName,
      fullName: `${firstName} ${lastName}`,
      email,
      roles: roles ? [roles.name] : [],
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
