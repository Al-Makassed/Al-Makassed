import React, {
  FC,
  KeyboardEvent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { iPadProWidth } from "src/constants/responsive";
import { noop } from "src/utils";
import SlideTransition from "../SlideTransition";
import MaqasidDialogCloseButton from "./MaqasidDialogCloseButton";
import MaqasidDialogFullscreenButton from "./MaqasidDialogFullscreenButton";
import MaqasidDialogHeader from "./MaqasidDialogHeader";
import MaqasidDialogHeaderActions from "./MaqasidDialogHeaderActions";
import MaqasidDialogHeaderTitle from "./MaqasidDialogHeaderTitle";
import { DialogContext } from "./context/Dialog";
import { StyledDialog } from "./styled";
import { MaqasidDialogProps } from "./types";
import MaqasidDialogBody from "./MaqasidDialogBody";
import MaqasidDialogFooter from "./MaqasidDialogFooter";
import SaveChangesConfirmationDialog from "./SaveChangesConfirmation";

const MaqasidDialog: FC<PropsWithChildren<MaqasidDialogProps>> = ({
  isOpen = false,
  onClose = noop,
  isFullscreen: isFullscreenProp,
  children,
  disableEscapeKeyDown = false,
  disableBackdropClick = false,
  onFullscreenToggle = noop,
  onClosed = noop,
  onEnter = noop,
  fullWidthOnSmallScreen = false,
  variant = "center",
  ...rest
}) => {
  const isTabletOrLessScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(iPadProWidth),
  );
  const [isSaveChangesConfirmationOpen, setIsSaveChangesConfirmationOpen] =
    useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const [isFullscreen, setIsFullscreen] = useState(isFullscreenProp ?? false);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== "Escape") return;

      if (isFullscreen) setIsFullscreen(false);
    },
    [isDirty, isFullscreen, disableEscapeKeyDown, onClose],
  );

  /* eslint-disable @typescript-eslint/ban-types */
  const handleClose = useCallback(
    (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => {
      if (isDirty) {
        setIsSaveChangesConfirmationOpen(true);
        return;
      }

      if (disableBackdropClick && reason == "backdropClick") return;

      if (disableEscapeKeyDown && reason == "escapeKeyDown") return;

      onClose(event, reason);
    },
    [isDirty, onClose],
  );

  const handleFullScreenToggle = useCallback(() => {
    setIsFullscreen(!isFullscreen);
    onFullscreenToggle(!isFullscreen);
  }, [isFullscreen, onFullscreenToggle]);

  const handleTransitionExited = useCallback(() => {
    setIsFullscreen(false);
    onClosed();
  }, [onClosed]);

  const handleCloseSaveChangesConfirmationDialog = () => {
    setIsSaveChangesConfirmationOpen(false);
  };

  const handleOnSetDirty = (isDirty: boolean) => {
    setIsDirty(isDirty);
  };

  useEffect(() => {
    if (fullWidthOnSmallScreen && isTabletOrLessScreen) setIsFullscreen(true);
  }, [isOpen, isTabletOrLessScreen, fullWidthOnSmallScreen]);

  return (
    <DialogContext.Provider
      value={{
        isFullscreen,
        onFullscreenToggle: handleFullScreenToggle,
        onDialogClose: () => handleClose(),
        fullWidthOnSmallScreen,
        isTabletOrLessScreen,
        saveChangesConfirmationDialog: {
          isOpen: isDirty && isSaveChangesConfirmationOpen,
          onSetDirty: handleOnSetDirty,
          onClose: handleCloseSaveChangesConfirmationDialog,
        },
      }}
    >
      <StyledDialog
        variant={variant}
        open={isOpen}
        fullScreen={isFullscreen}
        maxWidth="sm"
        fullWidth
        TransitionComponent={SlideTransition}
        transitionDuration={600}
        TransitionProps={{
          onEnter,
          onExited: handleTransitionExited,
        }}
        onClose={handleClose}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {children}
      </StyledDialog>
    </DialogContext.Provider>
  );
};

export default Object.assign(MaqasidDialog, {
  Header: MaqasidDialogHeader,
  Title: MaqasidDialogHeaderTitle,
  Actions: MaqasidDialogHeaderActions,
  Close: MaqasidDialogCloseButton,
  Fullscreen: MaqasidDialogFullscreenButton,
  Body: MaqasidDialogBody,
  Footer: MaqasidDialogFooter,
  SaveChangesConfirmationDialog: SaveChangesConfirmationDialog,
});
