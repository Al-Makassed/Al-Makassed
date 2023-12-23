export const REQUESTS_QUERY_KEY = ["request"];

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
