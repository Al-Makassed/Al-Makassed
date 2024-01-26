import axios from "src/API/axios";
import { ResetPasswordRequest } from "./types";
import { BaseSuccessResponse } from "src/types";

export const resetPasswordAPI = ({
  userId,
  currentPassword,
  newPassword,
}: ResetPasswordRequest) => {
  return axios
    .post<BaseSuccessResponse>("/authentication/reset-password", {
      userId,
      currentPassword,
      newPassword,
    })
    .then((res) => res.data);
};
