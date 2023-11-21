import { Policy, PolicyRequest } from "./types";
import { axiosFormData } from "src/API/axios";

export const createPolicy = async ({ formData,chapterId }: PolicyRequest) => {
  return await axiosFormData
    .post<Policy>(`/chapters/${chapterId}/policies`, formData)
    .then((res) => res.data);
};

