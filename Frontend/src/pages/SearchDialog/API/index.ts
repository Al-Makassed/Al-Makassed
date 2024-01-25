import axios from "src/API/axios";
import { MonitoringTool, SearchResponse } from "./types";

export const getSearchResults = (query: string) => {
  return axios
    .get<SearchResponse[]>(`/search?query=${query}`)
    .then((res) => res.data);
};

export const getMonitoringTool = (monitoringToolId: string) => {
  return axios
    .get<MonitoringTool>(`/monitoringtools/${monitoringToolId}`)
    .then((res) => res.data);
};
