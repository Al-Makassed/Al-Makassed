import { Policy, PolicyRequest } from "./types";
import { axiosFormData } from "src/API/axios";

export const createPolicy = ({ formData, chapterId }: PolicyRequest) => {
  return axiosFormData
    .post<Policy>(`/chapters/${chapterId}/policies`, formData)
    .then((res) => res.data);
};
