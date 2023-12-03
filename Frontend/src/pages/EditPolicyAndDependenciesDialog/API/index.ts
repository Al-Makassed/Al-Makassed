import axios, { axiosFormData } from "src/API/axios";
import {
  DeleteAllPolicyDependencies,
  DeletePolicyDependency,
  GetPolicy,
  Policy,
  UpdatePolicyRequest,
} from "./types";

export const getPolicy = ({ chapterId, policyId }: GetPolicy) => {
  return axios
    .get<Policy>(`/chapters/${chapterId}/policies/${policyId}`)
    .then((res) => res.data);
};

export const updatePolicyAPI = ({
  chapterId,
  policyId,
  formData,
}: UpdatePolicyRequest) => {
  console.log(chapterId, policyId, formData);
  return axiosFormData
    .put<void>(`/chapters/${chapterId}/policies/${policyId}`, formData)

    .then((res) => res.data);
};

export const deleteAllPolicyDependenciesAPI = ({
  chapterId,
  policyId,
  type,
}: DeleteAllPolicyDependencies) => {
  return axios

    .delete<void>(
      `/chapters/${chapterId}/policies/${policyId}/policy-dependencies/?type=${type}`,
    )
    .then((res) => res.data);
};

export const deleteDependencyAPI = ({
  chapterId,
  policyId,
  dependencyId: id,
}: DeletePolicyDependency) => {
  return axios
    .delete<void>(
      `/chapters/${chapterId}/policies/${policyId}/policy-dependencies/${id}`,
    )
    .then((res) => res.data);
};
