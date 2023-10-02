import React from "react";
import { IconButton, Theme, Typography, styled } from "@mui/material";
// import { green } from '@mui/material/colors';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  theme: Theme;
}
const Title = ({ setOpen, theme }: Props) => {
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <DrawerHeader>
      <Typography
        fontSize="1em"
        variant="h1"
        sx={{ color: (theme) => theme.palette.maqasid.primary }}
        //   color={green[900]}
        noWrap
        component="div"
      >
        Policies & Procedures
      </Typography>
      <IconButton onClick={handleDrawerClose}>
        {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </DrawerHeader>
  );
};

export default Title;
