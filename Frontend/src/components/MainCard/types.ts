import { SxProps } from "@mui/material";

export interface MainCardProps {
  border?: boolean;
  boxShadow?: boolean;
  contentSX?: SxProps;
  darkTitle?: boolean;
  divider?: boolean;
  elevation?: number;
  secondary?: React.ReactNode;
  shadow?: string;
  sx?: SxProps;
  title?: string | React.ReactNode;
  content?: boolean;
  children?: React.ReactNode;
}
