import React, { FC, MouseEvent } from "react";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { noop } from "src/utils";
import CloseIcon from "@mui/icons-material/Close";
import useDialogContext from "./context/useDialog";

const MaqasidDialogCloseButton: FC<IconButtonProps> = ({
  onClick = noop,
  ...rest
}) => {
  const { onDialogClose } = useDialogContext();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onDialogClose();
    onClick(event);
  };

  return (
    <IconButton
      aria-label="close"
      size="large"
      {...rest}
      onClick={handleClick}
      data-testid="closeButton"
    >
      <CloseIcon />
    </IconButton>
  );
};

export default MaqasidDialogCloseButton;
