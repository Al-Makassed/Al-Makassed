import { AxiosError } from "axios";
import { BaseResponse } from "../types";

const extractErrorMessages = (error: AxiosError<BaseResponse>) => {
  const errors = error.response?.data?.errors;
  if (!errors) return ["Something went wrong!"];
  return Object.values(errors).flatMap((arr) => arr);
};

export const extractErrorMessage = (error: AxiosError<BaseResponse>) => {
  return extractErrorMessages(error)[0];
};
