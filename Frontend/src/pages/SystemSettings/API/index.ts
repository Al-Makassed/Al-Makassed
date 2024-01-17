import axios from "src/API/axios";
import {
  Department,
  Field,
  User,
  UserDepartment,
  UserRequest,
  UserRoles,
  //  FocalPoint
} from "./type";

export const getDepartments = () => {
  return axios.get<Department[]>("/departments").then((res) => res.data);
};

export const getFields = () => {
  return axios.get<Field[]>("/fields").then((res) => res.data);
};

export const getUsers = () => {
  return axios.get<User[]>("/users").then((res) => res.data);
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

export const createField = (content: string) => {
  return axios.post<Field>("/fields", { content }).then((res) => res.data);
};

export const deleteField = (id: string) => {
  return axios.delete<Field>(`/fields/${id}`).then((res) => res.data);
};

export const renameFieldAPI = ({ id, content }: Field) => {
  return axios.put<Field>(`/fields/${id}`, { content }).then((res) => res.data);
};

//

export const createUser = ({ formData }: UserRequest) => {
  return axios
    .post<Field>("/users/upload-avatar", { formData })
    .then((res) => res.data);
};

export const deleteUser = (id: string) => {
  return axios.delete<User>(`/users/${id}`).then((res) => res.data);
};

export const renameUserRoleAPI = ({ id, roles }: UserRoles) => {
  return axios
    .put<User>(`/users/${id}/update-user-roles`, { roles })
    .then((res) => res.data);
};

export const renameUserDepartmentAPI = ({
  id,
  departmentId,
}: UserDepartment) => {
  return axios
    .put<User>(`/users/${id}/update-user-department`, { departmentId })
    .then((res) => res.data);
};
