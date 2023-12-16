import * as Yup from "yup";
import { AddMonitoringToolFormPayload } from "./types";

const validationSchema = Yup.object<AddMonitoringToolFormPayload>().shape({
  name: Yup.string().nullable().required("Policy name is required"),
  description: Yup.string()
    .nullable()
    .required("MT summary is required")
    .max(1000, "Too long summary"),
  departmentsIdes: Yup.array()
    .of(Yup.string())
    .min(1, "Departments are required")
    .required("Departments are required"),
  fieldsIdes: Yup.array()
    .of(Yup.string())
    .min(1, "Fields are required")
    .required("Fields are required"),
});

export default validationSchema;
