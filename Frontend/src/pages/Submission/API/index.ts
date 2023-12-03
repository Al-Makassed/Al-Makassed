import axios from "src/API/axios";
import { FocalPointTask, SubmissionRequest } from "./types";

export const getFocalPointTask = (
  departmentId: string,
  focalPointTaskId: string,
) => {
  return axios
    .get<FocalPointTask>(
      `/departments/${departmentId}/focal-point-task/${focalPointTaskId}`,
    )
    .then((res) => res.data);
};

// export const submitFocalPointTask = (departmentId:string, focalPointTaskId:string, answers: Answer[]) => {
export const submitFocalPointTask = ({
  departmentId,
  focalPointTaskId,
  answers,
}: SubmissionRequest) => {
  return axios
    .post<FocalPointTask>(
      `/departments/${departmentId}/focal-point-task/${focalPointTaskId}/submission`,
      { answers },
    )
    .then((res) => res.data);
};
