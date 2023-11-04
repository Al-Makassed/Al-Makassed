import axios from "src/API/axios";
import { ForgetResponse } from "./types";

export const forgotPassword = (userID: string) => {
  return axios
    .post<ForgetResponse>("/authentication/forgot-password", { userId: userID })
    .then((res) => res.data);
};
