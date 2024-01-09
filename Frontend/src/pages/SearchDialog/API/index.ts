import axios from "src/API/axios";
import { SearchResponse } from "./types";

export const getSearchResults = (query: string) => {
  return axios
    .get<SearchResponse[]>(`/search?query=${query}`)
    .then((res) => res.data);
};
