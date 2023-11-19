import { Policy } from "./types";
import axios from "src/API/axios";

export const getPolicy = (chapterId: string, id: string) => {
  return axios
    .get<Policy>(`/chapters/${chapterId}/policies/${id}`)
    .then((res) => res.data);
};
