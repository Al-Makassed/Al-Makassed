import axios from "src/API/axios";
import { Chapter } from "./types";
export const getChaptersById = async (id: string) => {
  console.log(id);

  return axios.get<Chapter>(`/chapters/${id}`).then((res) => res.data);
};
