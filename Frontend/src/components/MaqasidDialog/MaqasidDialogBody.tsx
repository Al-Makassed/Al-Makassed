import React, { forwardRef } from "react";
import DialogContent from "@mui/material/DialogContent";
import { Theme, useTheme } from "@mui/material/styles";
import { MaqasidDialogBodyProps } from "./types";

const MaqasidDialogBody = forwardRef<HTMLDivElement, MaqasidDialogBodyProps>(
  (props, ref) => {
    const { dividers = true, children, niceScroll, noPadding, ...rest } = props;

    const theme = useTheme<Theme>();

    return (
      <DialogContent
        dividers={dividers}
        ref={ref}
        {...rest}
        sx={{
          ...(niceScroll && {
            ...theme.mixins.niceScroll(),
          }),
          ...(noPadding && {
            p: 0,
          }),
        }}
      >
        {children}
      </DialogContent>
    );
  },
);

MaqasidDialogBody.displayName = "MaqasidDialogBody";

export default MaqasidDialogBody;
