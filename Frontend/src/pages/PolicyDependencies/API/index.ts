import { axiosFormData } from "src/API/axios";
import { DependencyRequest, DependencyResponse } from "./types";

export const addNewDependency = ({
  formData,
  chapterId,
  policyId,
}: DependencyRequest) => {
  return axiosFormData
    .post<DependencyResponse>(
      `/chapters/${chapterId}/policies/${policyId}/policy-dependencies`,
      formData,
    )
    .then((res) => res.data);
};
