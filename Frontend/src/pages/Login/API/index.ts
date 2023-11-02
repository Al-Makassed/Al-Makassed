import { LoginResponse, User } from "./types";
import axios from "src/API/axios";

export const loginApi = (user: User) => {
  return axios
    .post<LoginResponse>("/authentication/login", user)
    .then((res) => res.data);
};
