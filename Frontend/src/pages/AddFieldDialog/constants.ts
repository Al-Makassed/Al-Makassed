import { CreateFieldRequest } from "./API/types";

export const MONITORING_TOOLS_QUERY_KEY = ["MonitoringTools"];

export const CATEGORIES_QUERY_KEY = ["Categories"];

export const FIELDS_QUERY_KEY = ["Fields"];

export const initialValues: CreateFieldRequest = {
  content: "",
  categoryId: "",
};
