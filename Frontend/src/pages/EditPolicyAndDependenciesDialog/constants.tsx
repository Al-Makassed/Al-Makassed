import { EditPolicy } from "./types";

export const POLICY_QUERY_KEY = ["Policy"];

export enum PolicyDependencyType {
  Form = 0,
  Poster = 1,
  Protocol = 2,
}

export const initialValues: EditPolicy = {
  newName: "",
  newCode: "",
  newEstimatedTimeInMin: 0,
  newMainFile: undefined,
  newSummary: "",
};
