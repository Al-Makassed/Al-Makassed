import axios from "src/API/axios";
import { ResetForgottenPasswordRequest } from "./types";
import { BaseSuccessResponse } from "src/types";

export const resetForgottenPassword = ({
  password,
  email,
  token,
}: ResetForgottenPasswordRequest) => {
  return axios
    .post<BaseSuccessResponse>("/authentication/reset-forgotten-password", {
      password,
      email,
      token,
    })
    .then((res) => res.data);
};
