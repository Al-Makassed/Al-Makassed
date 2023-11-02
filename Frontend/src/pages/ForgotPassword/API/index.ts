// import { Chapter, CreateChapterResponse } from "./types";
import axios from "src/API/axios";

export const forgotPassword = (userID: string) => {
  return axios
    .post<string>("/authentication/forgot-password", { userId: userID })
    .then((res) => res.data);
};
