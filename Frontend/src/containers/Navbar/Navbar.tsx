import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import AccountMenu from "src/components/AccountMenu";
import NotificationsMenu from "src/components/NotificationsMenu";
import {
  hideSideDrawer,
  selectIsNavbarVisible,
  selectIsSideDrawerVisible,
  showSideDrawer,
} from "src/features/appSettings";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import maqasidLogo from "../../images/logo.jpg";
import LanguageSelector from "./components/LanguageSelector";
import ManagmentMenu from "./components/ManagmentMenu";
import MobileMenu from "./components/MobileMenu";
import SearchButton from "./components/SearchButton";
import { NAVBAR_PAGES } from "./constants";

const Navbar = () => {
  const isNavbarVisible = useAppSelector(selectIsNavbarVisible);

  const isSideDrawerVisible = useAppSelector(selectIsSideDrawerVisible);

  const navigate = useNavigate();

  const handleNavigate = (page: string) => () => navigate(page);

  const handleToggleAppSideDrawer = () => {
    const action = isSideDrawerVisible ? hideSideDrawer() : showSideDrawer();
    dispatch(action);
  };

  const dispatch = useAppDispatch();

  if (!isNavbarVisible) return null;

  return (
    <AppBar position="static" elevation={0} color="primary">
      <Toolbar sx={{ gap: { xs: 0.5, sm: 1 } }}>
        <IconButton onClick={handleToggleAppSideDrawer} color="inherit">
          {isSideDrawerVisible ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>

        <Avatar
          alt="logo"
          sx={{
            cursor: "pointer",
          }}
          src={maqasidLogo}
          onClick={handleNavigate("/me")}
        />

        <MobileMenu />

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
          <ManagmentMenu />
        </Stack>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" gap={0.5} alignItems={"center"}>
          {/* {!isMobile && <SearchBar />} */}
          <SearchButton />
          <LanguageSelector />
          <NotificationsMenu />
          <AccountMenu />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
