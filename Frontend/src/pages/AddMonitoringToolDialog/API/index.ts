import axios from "src/API/axios";
import { Department, Field, MonitoringToolResponse } from "./types";

export const createMonitoringTool = ({
  name,
  description,
  departmentsIdes,
  fieldsIdes,
}: MonitoringToolResponse) => {
  return axios
    .post<MonitoringToolResponse>(`/monitoringtools`, {
      name,
      description,
      departmentsIdes,
      fieldsIdes,
    })
    .then((res) => res.data);
};

export const getFields = () => {
  return axios.get<Field[]>("/fields").then((res) => res.data);
};

export const getDepartments = () => {
  return axios.get<Department[]>("/departments").then((res) => res.data);
};
