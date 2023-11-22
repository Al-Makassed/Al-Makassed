import * as yup from "yup";

const validationSchema = yup.object().shape({
  userId: yup.string().required("Please enter your user ID"),
  password: yup.string().required("Please enter your password"),
});

export default validationSchema;
