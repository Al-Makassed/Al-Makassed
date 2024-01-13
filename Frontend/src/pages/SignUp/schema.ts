import * as yup from "yup";

const validationSchema = yup.object().shape({
  userId: yup.string().required("Please enter your user ID"),
  userName: yup.string().required("Please enter your user Name"),
  fullName: yup.string().required("Please enter your user Full Name"),
  departmentId: yup.string().required("Please enter your department ID"),
  email: yup.string().required("Please enter your email"),
  roles: yup
    .array()
    .of(yup.string())
    .min(1, "Roles are required")
    .required("Roles are required"),
  password: yup.string().required("Please enter your password"),
});

export default validationSchema;
