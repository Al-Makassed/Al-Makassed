import * as Yup from "yup";
import { AddDependencyFormPayload } from "./types";

const validationSchema = Yup.object<AddDependencyFormPayload>().shape({
  name: Yup.string().nullable().required("Dependency name is required"),
  code: Yup.string().nullable().required("Dependency code is required"),
  estimatedTime: Yup.number()
    .max(60, "Too long estimated time")
    .positive("must be a positive number")
    .integer("must be an integer"),
  mainFile: Yup.mixed().required("Dependency file is required"),
});

export default validationSchema;
