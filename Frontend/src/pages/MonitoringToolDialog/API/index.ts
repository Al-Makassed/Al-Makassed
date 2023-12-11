import axios from "src/API/axios";
import { MonitoringTool, UpdateMonitoringToolRequest } from "./types";

export const getMonitoringTool = (monitoringToolId: string) => {
  return axios
    .get<MonitoringTool>(`/monitoringtools/${monitoringToolId}`)
    .then((res) => res.data);
};

export const updateMonitoringTool = ({
  monitoringToolId,
  name,
  description,
}: UpdateMonitoringToolRequest) => {
  return axios
    .put<MonitoringTool>(`/monitoringtools/${monitoringToolId}`, {
      name,
      description,
    })
    .then((res) => res.data);
};

export const deleteMonitoringTool = (monitoringToolId: string) => {
  return axios
    .delete<MonitoringTool>(`/monitoringtools/${monitoringToolId}`)
    .then((res) => res.data);
};
