import axios from "src/API/axios";
import { FocalPointTask, MonitoringTool } from "./types";

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
