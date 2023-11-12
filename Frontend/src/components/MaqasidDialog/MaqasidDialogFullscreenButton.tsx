import React, { FC } from "react";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { noop } from "src/utils";
import useDialogContext from "./context/useDialog";

const MaqasidDialogFullscreenButton: FC<IconButtonProps> = ({
  onClick = noop,
  ...rest
}) => {
  const {
    isFullscreen,
    onFullscreenToggle,
    fullWidthOnSmallScreen,
    isTabletOrLessScreen,
  } = useDialogContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onFullscreenToggle();
    onClick(event);
  };

  if (fullWidthOnSmallScreen && isTabletOrLessScreen) return null;

  return (
    <IconButton
      aria-label="Toggle Fullscreen"
      size="large"
      {...rest}
      onClick={handleClick}
      data-testid="fullscreenButton"
    >
      {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
    </IconButton>
  );
};

export default MaqasidDialogFullscreenButton;
