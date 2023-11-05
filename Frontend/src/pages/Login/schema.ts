import * as yup from "yup";

const loginSchema = yup.object().shape({
  userId: yup.string().required("Your ID is required!"),
  password: yup.string().required("Your password is required!"),
});

export default loginSchema;
