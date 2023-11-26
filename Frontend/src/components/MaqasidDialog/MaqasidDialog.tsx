import {
  FC,
  KeyboardEvent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import useMediaQuery from "src/hooks/useMediaQuery";
import { noop } from "src/utils";
import SlideTransition from "../SlideTransition";
import MaqasidDialogBody from "./MaqasidDialogBody";
import MaqasidDialogCloseButton from "./MaqasidDialogCloseButton";
import MaqasidDialogFooter from "./MaqasidDialogFooter";
import MaqasidDialogFullscreenButton from "./MaqasidDialogFullscreenButton";
import MaqasidDialogHeader from "./MaqasidDialogHeader";
import MaqasidDialogHeaderActions from "./MaqasidDialogHeaderActions";
import MaqasidDialogHeaderTitle from "./MaqasidDialogHeaderTitle";
import SaveChangesConfirmationDialog from "./SaveChangesConfirmation";
import { DialogContext } from "./context/Dialog";
import { StyledDialog } from "./styled";
import { MaqasidDialogProps } from "./types";

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
  const { isTablet } = useMediaQuery();
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
    if (fullWidthOnSmallScreen && isTablet) setIsFullscreen(true);
  }, [isOpen, isTablet, fullWidthOnSmallScreen]);

  return (
    <DialogContext.Provider
      value={{
        isFullscreen,
        onFullscreenToggle: handleFullScreenToggle,
        onDialogClose: () => handleClose(),
        fullWidthOnSmallScreen,
        isTabletOrLessScreen: isTablet,
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
