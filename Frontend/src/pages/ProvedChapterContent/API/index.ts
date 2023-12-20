import axios from "src/API/axios";
import { ApprovalRequests } from "./Types";

export const getApprovalRequests = () => {
  return axios.get<ApprovalRequests[]>(`requests`).then((res) => res.data);
};
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
