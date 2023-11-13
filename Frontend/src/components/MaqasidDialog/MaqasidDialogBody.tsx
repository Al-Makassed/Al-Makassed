import React, { forwardRef } from "react";
import DialogContent, { DialogContentProps } from "@mui/material/DialogContent";

interface MaqasidDialogBodyProps extends DialogContentProps {}

const MaqasidDialogBody = forwardRef<HTMLDivElement, MaqasidDialogBodyProps>(
  (props, ref) => {
    const { dividers = true, children, ...rest } = props;

    return (
      <DialogContent dividers={dividers} ref={ref} {...rest}>
        {children}
      </DialogContent>
    );
  },
);

MaqasidDialogBody.displayName = "MaqasidDialogBody";

export default MaqasidDialogBody;
