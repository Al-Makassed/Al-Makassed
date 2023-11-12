import React, { FC } from "react";
import DialogActions, { DialogActionsProps } from "@mui/material/DialogActions";

interface MaqasidDialogFooterProps extends DialogActionsProps {}

const MaqasidDialogFooter: FC<MaqasidDialogFooterProps> = ({
  children,
  ...rest
}) => {
  return (
    <DialogActions {...rest} sx={{ px: 3 }}>
      {children}
    </DialogActions>
  );
};

export default MaqasidDialogFooter;
