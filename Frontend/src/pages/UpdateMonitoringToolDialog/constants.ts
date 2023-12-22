import { AddFieldToMonitoringToolRequest } from "./API/types";

export const MONITORING_TOOL_QUERY_KEY = ["MonitoringTool"];

export enum DialogName {
  RemoveField = "RemoveField",
  AppendField = "AppendField",
  AssignDepartment = "AssignDepartment",
}

export const addFieldToMTInitialValues: AddFieldToMonitoringToolRequest = {
  monitoringToolId: "",
  fieldsIdes: [],
};
