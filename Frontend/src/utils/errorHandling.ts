import { AxiosError } from "axios";
import { BaseResponse } from "../types";

const extractErrorMessages = (error: AxiosError<BaseResponse>) => {
  const errors = error.response?.data?.errors;
  // Try to extract `errors` key from response (Backend returns this key only if the errors are validation errors)
  if (errors) return Object.values(errors).flatMap((arr) => arr);

  // If the response does not have `errors` key, try to extract `title` key from response. This will usually work for non-validation errors
  const title = error.response?.data?.title;
  if (title) return [title];

  // If the response does not have `title` key, return a generic error message
  return ["Something went wrong!"];
};

export const extractErrorMessage = (error: AxiosError<BaseResponse>) => {
  return extractErrorMessages(error)[0];
};
