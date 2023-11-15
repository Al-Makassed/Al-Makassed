import axios, { axiosFormData } from "src/API/axios";
import { Policy, UpdatePolicyRequest } from "./types";

export const getPolicyByCode = (code: string) => {
  return axios.get<Policy>(`/policies/${code}`).then((res) => res.data);
};

export const updatePolicyAPI = ({ code, formData }: UpdatePolicyRequest) => {
  return axiosFormData
    .put<void>(`/policies/${code}`, formData)
    .then((res) => res.data);
};
