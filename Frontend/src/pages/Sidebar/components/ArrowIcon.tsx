import React, { FC } from "react";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ArrowIconProps } from "../types";

const ArrowIcon: FC<ArrowIconProps> = ({ open, setOpen }) => {
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <IconButton
      size="large"
      // color="success"
      aria-label="open drawer"
      onClick={handleDrawerOpen}
      sx={{
        ...(open && { display: "none" }),
        width: "40px",
        height: "40px",
        border: (theme) => `1px solid ${theme.palette.grey[300]}`,
        backgroundColor: (theme) => theme.palette.maqasid.primary,
        "&:hover": {
          backgroundColor: (theme) => theme.palette.maqasid.primary,
        },
      }}
    >
      <ArrowForwardIosIcon
        sx={{
          color: "white",
        }}
      />
    </IconButton>
  );
};

export default ArrowIcon;
