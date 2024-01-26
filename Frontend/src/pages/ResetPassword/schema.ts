import * as yup from "yup";

const validationSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required("Please enter your current password")
    .min(6, "Password must be at least 6 characters long"),

  newPassword: yup
    .string()
    .required("Please enter your new password")
    .min(6, "Password must be at least 6 characters long")
    .notOneOf(
      [yup.ref("currentPassword")],
      "New password must be different from current.",
    ),
});

export default validationSchema;
