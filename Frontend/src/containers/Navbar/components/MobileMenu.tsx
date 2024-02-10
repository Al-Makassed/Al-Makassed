import SegmentIcon from "@mui/icons-material/Segment";
import { ListItemButton, ListItemText } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { FC, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MOBILE_MENU_PAGES } from "../constants";
import { useAppSelector } from "src/store/hooks";
import { selectIsManagerUser } from "src/features/user";

const MobileMenu: FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigate = useNavigate();

  const isManager = useAppSelector(selectIsManagerUser);

  const handleButtonClick = (page: string) => {
    handleCloseNavMenu();
    setTimeout(() => {
      navigate(page);
    }, 300);
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
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
          sx={{ transform: "scaleX(-1)" }}
        >
          <SegmentIcon />
        </IconButton>
      </Tooltip>

      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        {MOBILE_MENU_PAGES.map((page) => (
          <MenuItem
            key={page.name}
            sx={{
              color: (theme) => theme.palette.text.primary,
              display: page.managersOnly && !isManager ? "none" : "block",
            }}
          >
            <ListItemButton
              key={page.name}
              sx={{ textTransform: "none", p: 0 }}
              onClick={() => handleButtonClick(page.path)}
            >
              <ListItemText primary={page.name} />
            </ListItemButton>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default MobileMenu;
