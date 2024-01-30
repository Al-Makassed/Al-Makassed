export const REQUESTS_QUERY_KEY = ["request"];

export const MONITORING_TOOL_QUERY_KEY = ["MonitoringTool"];

export const POLICY_QUERY_KEY = "POLICY_QUERY_KEY";

export const Dependency_QUERY_KEY = "Dependency_QUERY_KEY";

export const enum RequestEntityType {
  Policy = 0,
  Dependency = 1,
  MonitoringTool = 2,
}
export const REQUEST_NAME = new Map([
  [RequestEntityType.Policy, "Policy"],
  [RequestEntityType.Dependency, "Dependency"],
  [RequestEntityType.MonitoringTool, "Monitoring Tool"],
]);

export enum DialogName {
  ViewPolicy = 0,
  ViewDependency = 1,
  ViewMonitoringTool = 2,
}
export enum PolicyDependencyType {
  Form = 0,
  Poster = 1,
  Protocol = 2,
}
