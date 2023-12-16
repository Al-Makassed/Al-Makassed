import { CreateFieldRequest } from "./API/types";

export const MONITORING_TOOLS_QUERY_KEY = ["MonitoringTools"];

export const FOCAL_POINT_TASKS_QUERY_KEY = ["FocalPointTasks"];

export const FIELDS_QUERY_KEY = ["Fields"];

export const initialValues: CreateFieldRequest = {
  content: "",
};

export enum MonitoringToolsDialog {
  MonitoringTool, // View and edit existing monitoring tool
  AddField,
  AddMonitoringTool,
}
