import * as Yup from "yup";
import { EditPolicy } from "./types";

const validationSchema = Yup.object<EditPolicy>().shape({
  newName: Yup.string().nullable().required("Policy name is required"),
  newCode: Yup.string().nullable().required("Policy code is required"),
  newSummary: Yup.string()
    .nullable()
    .required("Policy summary is required")
    .max(1000, "Too long summary"),
  newEstimatedTimeInMin: Yup.number()
    .max(60, "Too long estimated time")
    .positive("must be a positive number")
    .integer("must be an integer"),
  newMainFile: Yup.mixed().required("Policy file is required"),
});

export default validationSchema;
