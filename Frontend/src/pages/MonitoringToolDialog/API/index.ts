import axios from "src/API/axios";
import { MonitoringTool } from "./types";

export const getMonitoringTool = (monitoringToolId: string) => {
  return axios
    .get<MonitoringTool>(`/monitoringtools/${monitoringToolId}`)
    .then((res) => res.data);
};
