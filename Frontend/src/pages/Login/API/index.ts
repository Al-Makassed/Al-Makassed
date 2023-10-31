import { LoginResponse, User } from "./types";
import axios from "src/API/axios";

export const Login = (user: User) => {
  return axios
    .post<LoginResponse>("/authentication/login", user)
    .then((res) => res.data);
};
