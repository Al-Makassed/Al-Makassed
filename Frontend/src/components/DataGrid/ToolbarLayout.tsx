import Box, { BoxProps } from "@mui/material/Box";
import { FC, PropsWithChildren } from "react";
import { ToolbarLayoutProps } from "./types";

const ToolbarLayout: PropsWithChildren<ToolbarLayoutProps> = ({
  children,
  ...rest
}) => (
  <Box
    {...rest}
    sx={{
      display: "flex",
      mb: 2,
      justifyContent: "space-between",
      ...rest.sx,
    }}
  >
    {children}
  </Box>
);

const ToolbarStartCol: FC<BoxProps> = ({ children, ...rest }) => (
  <Box
    {...rest}
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      flexGrow: 1,
      ...rest.sx,
    }}
  >
    {children}
  </Box>
);

const ToolbarEndCol: FC<BoxProps> = ({ children, ...rest }) => (
  <Box
    {...rest}
    sx={{
      display: "flex",
      justifyContent: "flex-end",
      flexGrow: 1,
      gap: 1,
      ...rest.sx,
    }}
  >
    {children}
  </Box>
);

ToolbarLayout.Start = ToolbarStartCol;
ToolbarLayout.End = ToolbarEndCol;

export default ToolbarLayout;
