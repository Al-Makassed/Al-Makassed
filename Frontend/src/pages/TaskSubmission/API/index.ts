import axios from "src/API/axios";
import { FocalPointTask, SubmissionRequest } from "./types";

export const getFocalPointTask = (
  departmentId: string,
  focalPointTaskId: string,
) => {
  return axios
    .get<FocalPointTask>(
      `/focal-point-tasks/${focalPointTaskId}/departments/${departmentId}`,
    )
    .then((res) => res.data);
};

export const submitFocalPointTask = ({
  departmentId,
  focalPointTaskId,
  answers,
}: SubmissionRequest) => {
  return axios
    .post<FocalPointTask>(
      `/focal-point-tasks/${focalPointTaskId}/departments/${departmentId}/submissions`,
      { answers },
    )
    .then((res) => res.data);
};
