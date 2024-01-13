import axios from "src/API/axios";
import { SignUpResponse, SignUpRequest } from "./types";

export const SignUpApi = ({
  userId,
  userName,
  fullName,
  departmentId,
  email,
  password,
  roles,
}: SignUpRequest) => {
  return axios
    .post<SignUpResponse>("/authentication/register", {
      userId,
      userName,
      fullName,
      departmentId,
      email,
      password,
      roles,
    })
    .then((res) => res.data);
};
