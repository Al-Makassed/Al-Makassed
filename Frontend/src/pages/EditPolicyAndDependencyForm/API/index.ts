import axios, { axiosFormData } from "src/API/axios";
import {
  DeleteAllPolicyDependencies,
  Policy,
  UpdatePolicyRequest,
} from "./types";

export const getPolicyByCode = (code: string) => {
  return axios.get<Policy>(`/policies/${code}`).then((res) => res.data);
};

export const updatePolicyAPI = ({ code, formData }: UpdatePolicyRequest) => {
  return axiosFormData
    .put<void>(`/policies/${code}`, formData)
    .then((res) => res.data);
};

export const deleteAllPolicyDependenciesAPI = ({
  type,
  code,
}: DeleteAllPolicyDependencies) => {
  return axios
    .delete<void>(`/policies-dependencies?type=${type}&policyCode=${code}`)
    .then((res) => res.data);
};
export const deleteDependencyByCode = (code: string) => {
  return axios.delete<void>(`/policies/${code}`).then((res) => res.data);
};
