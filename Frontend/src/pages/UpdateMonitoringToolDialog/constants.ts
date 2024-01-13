import { AssignDepartmentsPayload } from "./types";

export const MONITORING_TOOL_QUERY_KEY = ["MonitoringTool"];
export const DEPARTMENT_QUERY_KEY = ["Departments"];

export enum DialogName {
  RemoveField = "RemoveField",
  AppendField = "AppendField",
  AssignDepartment = "AssignDepartment",
}

export const initialValues: AssignDepartmentsPayload = {
  departmentsIdes: [],
};
