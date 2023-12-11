import * as Yup from "yup";
import { UpdateMonitoringToolRequest } from "./API/types";

const validationSchema = Yup.object<UpdateMonitoringToolRequest>().shape({
  name: Yup.string().nullable().required("Monitoring tool name is required"),
});

export default validationSchema;
