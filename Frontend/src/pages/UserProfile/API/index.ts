import axios from "src/API/axios";
import {
  FinishedPolicy,
  PatchDocument,
  ReadingsPercentage,
  User,
} from "./types";

export const getUserById = (id: string) => {
  return axios.get<User>(`/users/${id}`).then((res) => res.data);
};

export const patchUser = (data: PatchDocument[]) => {
  return axios.patch<User>(`/users`, data).then((res) => res.data);
};

export const userPolicyReadingsPercentage = () => {
  return axios
    .get<ReadingsPercentage>("/readings/policies/percentage")
    .then((res) => res.data);
};

export const userDependencyReadingsPercentage = () => {
  return axios
    .get<ReadingsPercentage>("/readings/dependencies/percentage")
    .then((res) => res.data);
};

export const getFinishedPolicies = (query: string) => {
  return axios
    .get<FinishedPolicy[]>(`/readings/policies/finished${query}`)
    .then((res) => res.data);
};
