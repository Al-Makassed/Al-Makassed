export const POLICIES_QUERY_KEY = ["Policies"];
import { PolicyResponse } from "./API/types";

export const initialValues: PolicyResponse = {
  Name: "",
  Code: "",
  EstimatedTimeInMin: 0,
  MainFile: undefined,
  Summary: "",
};

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
