import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import AccountMenu from "src/components/AccountMenu";
import { selectIsNavbarVisible } from "src/features/appSettings/selectors";
import { useAppSelector } from "src/store/hooks";
import maqasidLogo from "../../images/logo.jpg";
import LanguageSelector from "./components/LanguageSelector";
import MobileMenu from "./components/MobileMenu";
import SearchButton from "./components/SearchButton";
import { NAVBAR_PAGES } from "./constants";
// import SearchBar from "./components/SearchBar";

const Navbar = () => {
  // const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  // const { isMobile } = useMediaQuery();

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  const isNavbarVisible = useAppSelector(selectIsNavbarVisible);

  const navigate = useNavigate();

  const handleNavigate = (page: string) => () => navigate(page);

  if (!isNavbarVisible) return null;

  return (
    <AppBar position="static" elevation={0} color="primary">
      <Toolbar sx={{ gap: { xs: 0.5, sm: 1 } }}>
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
        </Stack>

        <Box sx={{ flexGrow: 1 }} />

        {/* <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            color: (theme) => theme.palette.grey[50],
            bgcolor:"red",
            width: "100px",
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
        </Box> */}

        <Stack direction="row" gap={1} alignItems={"center"}>
          {/* {!isMobile && <SearchBar />} */}
          <SearchButton />
          <LanguageSelector />
          <AccountMenu />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
