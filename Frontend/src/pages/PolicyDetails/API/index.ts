import { Policy } from "./types";
import axios from "src/API/axios";

export const getPolicy = (chapterId: string, id: string) => {
  return axios
    .get<Policy>(`/chapters/${chapterId}/policies/${id}`)
    .then((res) => res.data);
};
export const finishReadingDependency = (dependencyId: string) => {
  return axios
    .post<void>(`readings/dependencies/${dependencyId}/finish-reading`)
    .then((res) => res.data);
};

export const finishReadingPolicy = (policyId: string) => {
  return axios
    .post<void>(`readings/policies/${policyId}/finish-reading`)
    .then((res) => res.data);
};
