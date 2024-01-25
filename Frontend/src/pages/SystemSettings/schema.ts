import * as Yup from "yup";
import { Department, Field } from "./API/type";

export const validationSchema = Yup.object<Department>().shape({
  name: Yup.string().nullable().required("Department name is required"),
});

export const fieldValidationSchema = Yup.object<Field>().shape({
  content: Yup.string().nullable().required("field content is required"),
});
