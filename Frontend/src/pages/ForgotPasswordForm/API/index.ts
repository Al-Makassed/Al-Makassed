import axios from "src/API/axios";
import { BaseSuccessResponse } from "src/types";

export const forgotPassword = (userID: string) => {
  return axios
    .post<BaseSuccessResponse>("/authentication/forgot-password", {
      userId: userID,
    })
    .then((res) => res.data);
};
