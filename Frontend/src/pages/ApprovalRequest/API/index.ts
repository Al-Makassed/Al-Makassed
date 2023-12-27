import axios from "src/API/axios";
import { ApprovalRequest, DeletePolicy, MonitoringTool, Policy } from "./Types";

export const getApprovalRequests = () => {
  return axios.get<ApprovalRequest[]>(`requests`).then((res) => res.data);
};

// ApprovalRequests

export const approvedPolicyAPI = (id: string) => {
  return axios.put<void>(`/requests/policies//${id}`).then((res) => res.data);
};

export const approvedMonitoringToolAPI = (id: string) => {
  return axios
    .put<void>(`/requests/monitoring-tools/${id}`)
    .then((res) => res.data);
};

export const approvedPolicyDependenciesAPI = (id: string) => {
  return axios
    .put<void>(`/requests/policy-dependencies/${id}`)
    .then((res) => res.data);
};

// Delete

export const deleteMonitoringTool = (monitoringToolId: string) => {
  return axios
    .delete<MonitoringTool>(`/monitoringtools/${monitoringToolId}`)
    .then((res) => res.data);
};

export const deletePolicyAPI = ({ chapterId, policyId: Id }: DeletePolicy) => {
  return axios
    .delete<void>(`/chapters/${chapterId}/policies/${Id}`)
    .then((res) => res.data);
};

export const getMonitoringTool = (monitoringToolId: string) => {
  return axios
    .get<MonitoringTool>(`/monitoringtools/${monitoringToolId}`)
    .then((res) => res.data);
};

export const getPolicy = (chapterId: string, id: string) => {
  return axios
    .get<Policy>(`/chapters/${chapterId}/policies/${id}`)
    .then((res) => res.data);
};
// to do delete dependency
