import * as yup from "yup";

export const validationSchema = yup.object({
  phoneNumber: yup
    .string()
    .matches(/^(?:[0-9] ?){6,14}[0-9]$/, "Invalid phone number"),
  email: yup.string().email("Invalid email format"),
});
