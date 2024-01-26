import { useFormik } from "formik";
import { INITIAL_VALUES } from "../constants";
import validationSchema from "../schema";
import { ResetPasswordFormPayload } from "../types";
import useResetPasswordAPI from "./useResetPasswordAPI";
import { useAppSelector } from "src/store/hooks";
import { selectUser } from "src/features/user";

const useResetPasswordForm = () => {
  const { resetPassword, isPending } = useResetPasswordAPI();

  const { userId } = useAppSelector(selectUser);

  const submitForm = (values: ResetPasswordFormPayload) => {
    return resetPassword({ userId, ...values });
  };

  const formikProps = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema,
    onSubmit: submitForm,
  });

  return { formikProps, isResetting: isPending };
};

export default useResetPasswordForm;
