import { Policy, PolicyRequest } from "./types";
import { axiosFormData } from "src/API/axios";

export const createPolicy = async ({ formData }: PolicyRequest) => {
  return await axiosFormData
    .post<Policy>("/policies", formData)
    .then((res) => res.data);
};
