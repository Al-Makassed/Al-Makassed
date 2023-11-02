import { DialogProps } from "@mui/material/Dialog";

export type MaqasidDialogVariant = "right" | "center";

export interface MaqasidDialogProps
  extends Omit<DialogProps, "open" | "fullScreen"> {
  isOpen: boolean;
  /** A callback fired when the dialog closes */
  onClose?: DialogProps["onClose"];
  disableBackdropClick?: boolean;
  /** If true, opens the dialog as full-screen. Setting this prop enables control over the dialog
   * @default false
   */
  isFullscreen?: boolean;
  /** A callback fired when the fullscreen button is clicked and the dialog is state is controlled */
  onFullscreenToggle?: (isFullscreen: boolean) => void;
  /** A callback fired when the close transition is finished */
  onClosed?: () => void;
  /** A callback fired before the "entering" state of the transition is applied */
  onEnter?: () => void;
  /** If true, it will be full by default, not allow the user to toggle full width */
  fullWidthOnSmallScreen?: boolean;
  /** To view the dialog as normal dialog or horizontal drawer */
  variant?: MaqasidDialogVariant;
}

export interface StyledDialogProps extends DialogProps {
  variant?: MaqasidDialogVariant;
}
