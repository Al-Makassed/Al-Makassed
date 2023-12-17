import * as Yup from "yup";
import { AddMonitoringToolFormPayload } from "./types";

const validationSchema = Yup.object<AddMonitoringToolFormPayload>().shape({
  name: Yup.string().nullable().required("Policy name is required"),
  description: Yup.string()
    .nullable()
    .required("MT summary is required")
    .max(1000, "Too long summary"),
});

export default validationSchema;
