import axios from "src/API/axios";
import { PatchDocument, User } from "./types";

export const getUserById = (id: string) => {
  return axios.get<User>(`/users/${id}`).then((res) => res.data);
};

export const patchUser = (data: PatchDocument[]) => {
  return axios.patch<User>(`/users`, data).then((res) => res.data);
};
