import * as yup from "yup";

const validationSchema = yup.object().shape({
  currentPassword: yup.string().required("Please enter your password"),
  newPassword: yup.string().required("Please enter your new password"),
});

export default validationSchema;
