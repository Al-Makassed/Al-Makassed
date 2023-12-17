export const MONITORINGTOOL_QUERY_KEY = ["Policies"];
export const FIELD_QUERY_KEY = ["Field"];
export const DEPARTMENT_QUERY_KEY = ["Department"];
import { MonitoringToolResponse } from "./API/types";

export const initialValues: MonitoringToolResponse = {
  name: "",
  description: "",
  fieldsIdes: [],
  departmentsIdes: [],
};
