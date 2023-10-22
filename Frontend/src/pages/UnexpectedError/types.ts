import { StackProps } from "@mui/material/Stack";
import React from "react";

export interface UnexpectedErrorProps {
  error: any;
  resetErrorBoundary: (...args: any[]) => void;
}

export interface ContainerStackProps extends StackProps {
  isProduction?: boolean;
}

export interface ErrorDetailProps {
  isErrorMessage?: boolean;
  isErrorStack?: boolean;
  children: React.ReactElement;
}
