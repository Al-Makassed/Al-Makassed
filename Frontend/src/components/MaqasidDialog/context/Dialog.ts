import { createContext } from "react";

export interface SaveChangesConfirmationDialog {
  isOpen: boolean;
  onSetDirty: (value: boolean) => void;
  onClose: () => void;
}

export interface DialogContextValues {
  isFullscreen: boolean;
  onFullscreenToggle: () => void;
  onDialogClose: () => void;
  fullWidthOnSmallScreen: boolean;
  isTabletOrLessScreen: boolean;
  saveChangesConfirmationDialog: SaveChangesConfirmationDialog;
}

export const DialogContext = createContext<DialogContextValues | null>(null);

export default DialogContext;
