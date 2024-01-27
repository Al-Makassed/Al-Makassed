import { ChipProps } from "@mui/material";

export interface AnalyticCardProps {
  color?: ChipProps["color"];
  title?: string;
  count?: string;
  percentage?: number;
  isLoss?: boolean;
  extra?: React.ReactNode | string;
}
