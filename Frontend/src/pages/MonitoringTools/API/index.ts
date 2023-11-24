import axios from "src/API/axios";
import { MonitoringTool } from "../types";

export const getMonitoringTools = () => {
  return axios
    .get<MonitoringTool[]>("/monitoringtools")
    .then((res) => res.data);
};
