import axios from "src/API/axios";
import { Department } from "./type";

export const getDepartments = () => {
  return axios.get<Department[]>("/departments").then((res) => res.data);
};

export const createDepartment = async (name: string) => {
  return await axios
    .post<Department>("/departments", { name })
    .then((res) => res.data);
};
