import React from "react";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ArrowIcon = ({ open, setOpen }: Props) => {
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <IconButton
      aria-label="open drawer"
      onClick={handleDrawerOpen}
      sx={{
        ...(open && { display: "none" }),
        width: "50px",
        height: "50px",
        backgroundColor: (theme) => theme.palette.maqasid.primary,
      }}
    >
      {" "}
      <ArrowForwardIosIcon
        sx={{
          color: "white",
        }}
      />
    </IconButton>
  );
};

export default ArrowIcon;
