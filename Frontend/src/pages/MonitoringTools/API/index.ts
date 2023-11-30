import axios from "src/API/axios";
import {
  CreateFieldRequest,
  Field,
  FocalPointTask,
  MonitoringTool,
  MonitoringToolDetails,
} from "./types";

export const getMonitoringTools = () => {
  return axios
    .get<MonitoringTool[]>("/monitoringtools")
    .then((res) => res.data);
};

export const getFocalPointTasks = (departmentId: string) => {
  return axios
    .get<FocalPointTask[]>(`/departments/${departmentId}/focal-point-task`)
    .then((res) => res.data);
};

export const createField = ({ content }: CreateFieldRequest) => {
  return axios
    .post<Field>("/fields", { content: content })
    .then((res) => res.data);
};

export const getMonitoringTool = (monitoringToolId: string) => {
  return axios
    .get<MonitoringToolDetails>(`/monitoringtools/${monitoringToolId}`)
    .then((res) => res.data);
};
