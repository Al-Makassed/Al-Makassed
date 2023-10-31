import { AxiosError } from "axios";
import { BaseResponse } from "src/types";

const extractErrorMessages = (error: AxiosError<BaseResponse>) => {
  const errors = error.response?.data?.title;
  // if (!errors) return ["Something went wrong!"];
  return errors;
};

export const extractErrorMessage = (errors: AxiosError<BaseResponse>) => {
  return extractErrorMessages(errors);
};
