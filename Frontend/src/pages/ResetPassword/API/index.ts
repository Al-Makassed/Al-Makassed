import axios from "src/API/axios";
import { forgotResetPassword } from "./types";

export const resetPassword = ({
  password,
  confirmPassword,
  email,
  encodedToken,
}: forgotResetPassword) => {
  return axios
    .post<string>("/authentication/reset-password", {
      password,
      confirmPassword,
      email,
      token: encodedToken,
    })
    .then((res) => res.data);
};
