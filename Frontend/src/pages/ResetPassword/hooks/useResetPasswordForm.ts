import { useFormik } from "formik";
import { INITIAL_VALUES } from "../constants";
import validationSchema from "../schema";
import { ResetPasswordFormPayload } from "../types";
import useResetPasswordAPI from "./useResetPasswordAPI";
import { useAppSelector } from "src/store/hooks";
import { selectUser } from "src/features/user";

const useResetPasswordForm = () => {
  const { resetPassword } = useResetPasswordAPI();

  const { userId } = useAppSelector(selectUser);
  const submitForm = (values: ResetPasswordFormPayload) => {
    const { currentPassword, newPassword } = values;
    return resetPassword({ userId, currentPassword, newPassword });
  };

  const formikProps = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema,
    onSubmit: submitForm,
  });

  return formikProps;
};

export default useResetPasswordForm;
