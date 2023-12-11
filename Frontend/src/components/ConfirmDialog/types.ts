import { ReactNode } from "react";
import { ButtonProps } from "@mui/material/Button";
import { MaqasidDialogProps } from "../MaqasidDialog/types";

export interface ConfirmDialogProps extends MaqasidDialogProps {
  isOpen: boolean;
  title: string;
  subtitle?: ReactNode;
  onClose?: () => void;
  onCancel?: ButtonProps["onClick"];
  body?: ReactNode;
  actions?: DialogAction[];
}

export interface DialogAction extends ButtonProps {
  text: string;
}
