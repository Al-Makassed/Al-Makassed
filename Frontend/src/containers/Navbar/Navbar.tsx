import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import AccountMenu from "src/components/AccountMenu";
import { SETTINGS, NAVBAR_PAGES } from "./constants";
import { selectIsNavbarVisible } from "src/features/appSettings/selectors";
import useMediaQuery from "src/hooks/useMediaQuery";
import { useAppSelector } from "src/store/hooks";
import maqasidLogo from "../../images/logo.jpg";
import LanguageSelector from "./components/LanguageSelector";
import MobileMenu from "./components/MobileMenu";
import SearchBar from "./components/SearchBar";
// import SidebarChevron from "./components/SidebarChevron";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const { isMobile } = useMediaQuery();

  const isNavbarVisible = useAppSelector(selectIsNavbarVisible);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  const handleNavigate = (page: string) => () => navigate(page);

  if (!isNavbarVisible) return null;

  return (
    <AppBar position="static" elevation={0} color="primary">
      <Toolbar sx={{ gap: 1 }}>
        <Avatar
          alt="logo"
          sx={{
            cursor: "pointer",
          }}
          src={maqasidLogo}
          onClick={handleNavigate("/me")}
        />

        <Stack
          direction="row"
          sx={{
            display: { xs: "none", md: "flex" },
            ml: 1.5,
          }}
        >
          {NAVBAR_PAGES.map((page) => (
            <Button
              key={page.name}
              sx={{
                textTransform: "none",
                color: (theme) => theme.palette.grey[50],
              }}
              onClick={handleNavigate(page.path)}
            >
              {page.name}
            </Button>
          ))}
        </Stack>

        <Box sx={{ flexGrow: 1 }} />

        {!isMobile && <SearchBar />}

        <Box
          sx={{
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
            {SETTINGS.map((setting) => (
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
