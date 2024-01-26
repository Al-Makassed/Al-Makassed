import axios from "src/API/axios";
import { FileEntity, FinishedFile, ReadingsPercentage } from "./types";

export const getFileEntities = () => {
  return axios
    .get<FileEntity[]>(`/readings/system-files`)
    .then((res) => res.data);
};

export const getReadPolicies = (query: string) => {
  return axios
    .get<FinishedFile[]>(`/readings/policies/finished${query}`)
    .then((res) => res.data);
};

export const getReadDependencies = (query: string) => {
  return axios
    .get<FinishedFile[]>(`/readings/dependencies/finished${query}`)
    .then((res) => res.data);
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
