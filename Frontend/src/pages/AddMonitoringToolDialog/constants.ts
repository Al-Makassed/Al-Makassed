import { AddMonitoringToolFormPayload } from "./types";

export const MONITORING_TOOL_QUERY_KEY = ["MonitoringTool"];

export const FIELD_QUERY_KEY = ["Field"];

export const DEPARTMENT_QUERY_KEY = ["Department"];

export const initialValues: AddMonitoringToolFormPayload = {
  name: "",
  description: "",
  fieldsIdes: [],
  departmentsIdes: [],
};
