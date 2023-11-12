import React, { FC, PropsWithChildren } from "react";
import Box, { BoxProps } from "@mui/material/Box";

interface MaqasidDialogHeaderActions extends BoxProps {}

const MaqasidDialogHeaderActions: FC<PropsWithChildren<BoxProps>> = ({
  children,
  ...rest
}) => (
  <Box
    {...rest}
    sx={{
      display: "flex",
      alignItems: "center",
      ...rest.sx,
    }}
  >
    {children}
  </Box>
);

export default MaqasidDialogHeaderActions;
