import axios from "src/API/axios";
import { Chapter, RenameChapterRequest } from "./types";

export const getChapterById = (id: string) => {
  return axios.get<Chapter>(`/chapters/${id}`).then((res) => res.data);
};

export const deletePolicyByCode = (code: string) => {
  return axios.delete<void>(`/policies/${code}`).then((res) => res.data);
};

export const deleteAllPoliciesAPI = (id: string) => {
  return axios
    .delete<void>(`/policies?chapterId=${id}`)
    .then((res) => res.data);
};

export const renameChapterAPI = ({
  newChapterName,
  id,
}: RenameChapterRequest) => {
  return axios
    .put<void>(`/chapters/${id}`, { name: newChapterName })
    .then((res) => res.data);
};
