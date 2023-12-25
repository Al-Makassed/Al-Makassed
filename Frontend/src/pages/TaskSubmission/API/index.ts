import axios from "src/API/axios";
import {
  FocalPointTask,
  Submission,
  SubmissionLogRequest,
  SubmissionRequest,
} from "./types";

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
      `/focal-point-tasks/${focalPointTaskId}/departments/${departmentId}/submissions/submit`,
      { answers },
    )
    .then((res) => res.data);
};

export const getTaskSubmissions = ({
  departmentId,
  focalPointTaskId,
}: SubmissionLogRequest) => {
  return axios
    .get<Submission[]>(
      `/focal-point-tasks/${focalPointTaskId}/departments/${departmentId}/submissions/log`,
    )
    .then((res) => res.data);
};
