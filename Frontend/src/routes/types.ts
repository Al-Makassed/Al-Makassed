export type Role = "Admin" | "Staff" | "Focal Point";

export interface PageAccessRight {
  roles: Role[][];
}

export type PageAccessName = "Home" | "Dashboard" | "Page3" | "Page4";

export interface RouteConfigs {
  title: string;
  pageAccessName?: PageAccessName;
}

export interface AuthRouteProps {}
