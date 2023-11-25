import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import maqasidLogo from "../../images/logo.jpg";
import Searching from "./components/Searching";
import LanguageSelector from "./components/LanguageSelector";
import SidebarChevron from "./components/SidebarChevron";
import MobileMenu from "./components/MobileMenu";
import { pages, settings } from "src/constants";
import AccountMenu from "src/components/AccountMenu";

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" elevation={0} color="primary">
      <Toolbar sx={{ gap: 1 }}>
        <SidebarChevron />

        <Avatar
          alt="logo"
          // variant="rounded"
          sx={{
            display: { xs: "none", md: "flex" },
          }}
          src={maqasidLogo}
        />

        <Box sx={{ flexGrow: 0.06 }} />

        <Box
          sx={{
            flexGrow: 2,
            gap: 1,
            display: { xs: "none", md: "flex" },
          }}
        >
          {pages.map((page) => (
            <Button
              key={page}
              // onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                mx: 0,
                textTransform: "none",
                color: (theme) => theme.palette.grey[50],
                display: "block",
              }}
            >
              {page}
            </Button>
          ))}
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Searching />

        <Box
          sx={{
            flexGrow: 0.5,
            display: "flex",
            alignItems: "center",
            gap: 2,
            color: (theme) => theme.palette.grey[50],
          }}
        >
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Stack direction="row" gap={1}>
          <MobileMenu />
          <LanguageSelector />
          <AccountMenu />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
