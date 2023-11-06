import { LoginResponse, LoginRequest } from "./types";
import axios from "src/API/axios";

export const loginApi = (payload: LoginRequest) => {
  return axios
    .post<LoginResponse>("/authentication/login", payload)
    .then((res) => res.data);
};
