import axios from "src/API/axios";
import { User } from "./types";

export const getUserById = (id: string) => {
  return axios.get<User>(`/users/${id}`).then((res) => res.data);
};
