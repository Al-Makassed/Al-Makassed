import React from "react";
import { IconButton, Typography, styled, useTheme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Title = ({ setOpen }: Props) => {
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1.5),
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
  }));
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const theme = useTheme();

  return (
    <DrawerHeader sx={{ bgcolor: (theme) => theme.palette.maqasid.secondary }}>
      <Typography
        paddingRight="1em"
        variant="h6"
        sx={{ color: (theme) => theme.palette.maqasid.primary }}
        fontWeight={700}
        fontSize="1.3em"
        noWrap
        component="div"
      >
        Policies & Procedures
      </Typography>
      <IconButton
        sx={{
          background: (theme) => theme.palette.maqasid.primary,
          width: "28px",
          height: "28px",
          "&:hover": {
            background: (theme) => theme.palette.maqasid.primary,
          },
        }}
        onClick={handleDrawerClose}
      >
        {theme.direction === "ltr" ? (
          <ChevronLeftIcon sx={{ color: "white" }} />
        ) : (
          <ChevronRightIcon />
        )}
      </IconButton>
    </DrawerHeader>
  );
};

export default Title;
