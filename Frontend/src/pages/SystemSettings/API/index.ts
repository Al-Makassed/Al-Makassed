import axios from "src/API/axios";
import {
  Department,
  //  FocalPoint
} from "./type";

export const getDepartments = () => {
  return axios.get<Department[]>("/departments").then((res) => res.data);
};

// export const getFocalPoints = () => {
//   return axios.get<FocalPoint[]>("/focal-points").then((res) => res.data);
// };

export const createDepartment = (name: string) => {
  return axios
    .post<Department>("/departments", { name })
    .then((res) => res.data);
};

export const renameDepartmentAPI = ({ id, name, headId }: Department) => {
  return axios
    .put<Department>(`/departments/${id}`, { name, headId })
    .then((res) => res.data);
};

export const deleteDepartment = (id: string) => {
  return axios.delete<Department>(`/departments/${id}`).then((res) => res.data);
};
