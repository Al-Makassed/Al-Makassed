import { AddPolicyDependencyResponse } from "./API/types";

export const DEPENDENCIES_QUERY_KEY = ["Dependencies"];

export enum PolicyDependencyType {
  Form = 0,
  Poster = 1,
  Protocol = 2,
}

export const POLICY_DEPENDENCIES_DISPLAY_NAMES = new Map([
  [PolicyDependencyType.Form, "Form"],
  [PolicyDependencyType.Poster, "Poster"],
  [PolicyDependencyType.Protocol, "Protocol"],
]);

export const initialValues: AddPolicyDependencyResponse = {
  name: "",
  code: "",
  estimatedTime: 0,
  mainFile: undefined,
  type: 0,
};
