import axios from "src/API/axios";
import { Department } from "./type";

export const getDepartments = () => {
  return axios.get<Department[]>("/departments").then((res) => res.data);
};

export const createDepartment = (name: string) => {
  return axios
    .post<Department>("/departments", { name })
    .then((res) => res.data);
};

export const renameDepartmentAPI = () => {
  return axios.put<void>("").then((res) => res.data);
};
