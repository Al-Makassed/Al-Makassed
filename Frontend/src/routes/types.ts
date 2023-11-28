export type Role = "Admin" | "Sub-Admin" | "Focal Point" | "Staff";

export interface PageAccessRight {
  roles: Role[][];
}

export type PageAccessName = "Home" | "Dashboard" | "MonitoringTools" | "Page4";

export interface RouteConfigs {
  title: string;
  pageAccessName?: PageAccessName;
}

export interface AuthRouteProps {}
