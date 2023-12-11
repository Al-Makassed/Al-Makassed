import React, { FC, MouseEvent, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { NAVBAR_PAGES } from "../constants";
import SegmentIcon from "@mui/icons-material/Segment";

const MobileMenu: FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "flex", md: "none" },
      }}
    >
      <Tooltip title="navigate to" enterDelay={1000} enterNextDelay={1000}>
        <IconButton
          // size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <SegmentIcon />
        </IconButton>
      </Tooltip>

      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        {NAVBAR_PAGES.map((page) => (
          <MenuItem key={page.name} onClick={handleCloseNavMenu}>
            <Typography textAlign="center">{page.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default MobileMenu;
