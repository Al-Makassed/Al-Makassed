import * as yup from "yup";

const validationSchema = yup.object().shape({
  userId: yup.string().required("User ID is required"),
  userName: yup.string().required("User Name is required"),
  departmentId: yup.string().required("Department is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  roles: yup.object().required("Role is required"),
  password: yup.string().required("Password is required"),
});

export default validationSchema;
