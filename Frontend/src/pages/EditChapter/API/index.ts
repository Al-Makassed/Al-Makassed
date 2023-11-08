import axios from "src/API/axios";
import { Chapter, RenameChapter } from "./types";

export const getChaptersById = async (id: string) => {
  return axios.get<Chapter>(`/chapters/${id}`).then((res) => res.data);
};

export const deletePolicyByCode = async (code: string) => {
  return axios.delete(`/policies/${code}`).then((res) => res.data);
};

export const deleteAllPoliciesAPI = async (id: string) => {
  return axios.delete(`/policies?chapterId=${id}`).then((res) => res.data);
};

export const renameChapterAPI = async ({
  newChapterName,
  id,
}: RenameChapter) => {
  return axios
    .put(`/chapters/${id}`, { name: newChapterName })
    .then((res) => res.data);
};
