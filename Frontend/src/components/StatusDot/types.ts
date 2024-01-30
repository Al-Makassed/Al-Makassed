export type Color =
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "primary"
  | "grey.500";

export interface StatusDotProps {
  color?: Color;
  size?: number;
}
