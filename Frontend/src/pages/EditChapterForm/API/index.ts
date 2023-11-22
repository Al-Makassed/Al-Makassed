import axios from "src/API/axios";
import { Chapter, DeletePolicy, RenameChapterRequest } from "./types";

export const getChapterById = (id: string) => {
  // console.log(id);
  return axios.get<Chapter>(`/chapters/${id}`).then((res) => res.data);
};

export const deletePolicyAPI = ({ chapterId, policyId: Id }: DeletePolicy) => {
  return axios
    .delete<void>(`/chapters/${chapterId}/policies/${Id}`)
    .then((res) => res.data);
};

export const deleteAllPoliciesAPI = (id: string) => {
  return axios.delete<void>(`/chapters/${id}/policies`).then((res) => res.data);
};

export const renameChapterAPI = ({
  newChapterName,
  id,
}: RenameChapterRequest) => {
  return axios
    .put<void>(`/chapters/${id}`, { name: newChapterName })
    .then((res) => res.data);
};
