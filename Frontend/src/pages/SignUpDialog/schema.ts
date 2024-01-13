import * as yup from "yup";

const validationSchema = yup.object().shape({
  userId: yup.string().required("User ID is required"),
  userName: yup.string().required("User Name is required"),
  fullName: yup.string().required("Full Name is required"),
  departmentId: yup.string().required("Department is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  roles: yup
    .array()
    .of(yup.string())
    .min(1, "Roles are required")
    .required("Roles are required"),
  password: yup.string().required("Password is required"),
});

export default validationSchema;
