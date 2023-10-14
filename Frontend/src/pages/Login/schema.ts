import * as yup from "yup";

const loginSchema = yup.object().shape({
  id: yup.string().required("Your ID is required!"),
  password: yup.string().required("Your password is required!"),
});

export default loginSchema;
