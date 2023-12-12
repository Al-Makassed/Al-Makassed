import axios from "src/API/axios";
import {
  DeleteMonitoringToolDepartmentRequest,
  DeleteMonitoringToolFieldRequest,
  MonitoringTool,
  UpdateMonitoringToolRequest,
} from "./types";

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

export const deleteMonitoringToolField = ({
  monitoringToolId,
  fieldId,
}: DeleteMonitoringToolFieldRequest) => {
  return axios
    .delete(`/monitoringtools/${monitoringToolId}/fields/${fieldId}`)
    .then((res) => res.data);
};

export const deleteMonitoringToolDepartment = ({
  monitoringToolId,
  departmentId,
}: DeleteMonitoringToolDepartmentRequest) => {
  return axios
    .delete(`/monitoringtools/${monitoringToolId}/departments/${departmentId}`)
    .then((res) => res.data);
};
