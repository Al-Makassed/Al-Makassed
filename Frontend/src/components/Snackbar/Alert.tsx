import React, { forwardRef } from "react";
import Alert, { AlertProps } from "@mui/material/Alert";

const MaqasidAlert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

MaqasidAlert.displayName = "Alert";

export default MaqasidAlert;
