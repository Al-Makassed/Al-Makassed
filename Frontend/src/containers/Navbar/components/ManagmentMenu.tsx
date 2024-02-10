import {
  Box,
  Button,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { FC, MouseEvent, useState } from "react";
import { useNavigate } from "react-router";
import { MANAGMENT_MENU_PAGES } from "../constants";

const ManagmentMenu: FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenManagmentMenu = (event: MouseEvent<HTMLElement>) => {
    console.log("Button Clicked");
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseManagmentMenu = () => {
    setAnchorElNav(null);
  };

  const navigate = useNavigate();

  const handleButtonClick = (page: string) => {
    handleCloseManagmentMenu();
    setTimeout(() => {
      navigate(page);
    }, 300);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <Button
        sx={{
          textTransform: "none",
          color: (theme) => theme.palette.grey[50],
        }}
        onClick={handleOpenManagmentMenu}
      >
        Management ▾
      </Button>

      <Menu
        id="menu"
        anchorEl={anchorElNav}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseManagmentMenu}
      >
        {MANAGMENT_MENU_PAGES.map((page) => (
          <MenuItem
            key={page.name}
            sx={{ color: (theme) => theme.palette.text.primary }}
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

export default ManagmentMenu;
