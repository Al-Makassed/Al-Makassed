import axios, { axiosFormData } from "src/API/axios";

import { Field, MonitoringToolRequest, MonitoringToolResponse } from "./types";

export const createMonitoringTool = async ({
  formData,
}: MonitoringToolRequest) => {
  return await axiosFormData
    .post<MonitoringToolResponse>(`/monitoringtools`, formData)
    .then((res) => res.data);
};

export const getFields = () => {
  return axios.get<Field[]>("/fields").then((res) => res.data);
};
