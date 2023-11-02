import { createContext } from "react";

export interface DialogContextValues {
  isFullscreen: boolean;
  onFullscreenToggle: () => void;
  onDialogClose: () => void;
  fullWidthOnSmallScreen: boolean;
  isTabletOrLessScreen: boolean;
}

export const DialogContext = createContext<DialogContextValues | null>(null);

export default DialogContext;
