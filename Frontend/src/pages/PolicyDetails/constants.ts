export const POLICIES_QUERY_KEY = "Policies";

export const FINISH_READING_POLICY_QUERY_KEY = "FinishPolicy";

export const FINISH_READING_DEPENDENCY_QUERY_KEY = "FinishDependency";

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
