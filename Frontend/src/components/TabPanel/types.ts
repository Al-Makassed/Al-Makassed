import { BoxProps, TabProps } from "@mui/material";
import { ReactNode } from "react";

export interface TabPanelProps extends BoxProps {
  children?: ReactNode;
  index: number;
  value: TabProps["value"];
}
