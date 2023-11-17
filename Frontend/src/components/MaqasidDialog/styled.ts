import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { StyledDialogProps } from "./types";

export const StyledDialog = styled(Dialog, {
  shouldForwardProp: (prop) => prop !== "variant",
  name: "StyledDialog",
})<StyledDialogProps>(({ variant }) => ({
  ...(variant !== "center" && {
    "& .MuiDialog-paper": {
      height: "100%",
      position: "fixed",
      top: 0,
      margin: 0,
      maxHeight: "unset",

      left: "auto",
      right: 0,
    },
  }),
}));
