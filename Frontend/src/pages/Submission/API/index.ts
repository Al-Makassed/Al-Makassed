import axios from "src/API/axios";
import { FocalPointTask } from "./types";

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
