import * as Yup from "yup";
import { AddPolicyFormPayload } from "./types";

const validationSchema = Yup.object<AddPolicyFormPayload>().shape({
  Name: Yup.string().nullable().required("Policy name is required"),
  Code: Yup.string().nullable().required("Policy code is required"),
  EstimatedTimeInMin: Yup.number()
    .max(60, "Too long estimated time")
    .positive("must be a positive number")
    .integer("must be an integer"),
  MainFile: Yup.mixed().required("Policy file is required"),
});

export default validationSchema;
