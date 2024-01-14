import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import React from "react";
import GroupIcon from "@mui/icons-material/Group";
import { useNavigate } from "react-router-dom";
import BusinessIcon from "@mui/icons-material/Business";
import FieldIcon from "@mui/icons-material/QuizOutlined";

const drawerWidth = 300;

const SystemSidebar = () => {
  const navigate = useNavigate();
  const handleClickDepartment = () => {
    navigate(`department`);
  };

  const handleClickField = () => {
    navigate(`field`);
  };

  const handleClickUser = () => {
    navigate(`user`);
  };
  return (
    // <Stack direction="row" gap={3} pt={3}>
    <Drawer
      sx={{
        position: "relative",
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
        "& .MuiPaper-root": {
          backgroundColor: (theme) => theme.palette.grey[200],
          mt: 8,
        },

        display: { xs: "none", md: "block" },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ display: "flex" }}>
        <List>
          <ListItemButton onClick={handleClickDepartment}>
            <ListItemIcon sx={{ mr: -2.5 }}>
              <BusinessIcon />
            </ListItemIcon>

            <Typography
              fontWeight={500}
              sx={{ color: (theme) => theme.palette.text.primary }}
            >
              Departments
            </Typography>
          </ListItemButton>

          <ListItemButton onClick={handleClickField}>
            <ListItemIcon sx={{ mr: -2.5 }}>
              <FieldIcon />
            </ListItemIcon>

            <Typography
              fontWeight={500}
              sx={{ color: (theme) => theme.palette.text.primary }}
            >
              Fields
            </Typography>
          </ListItemButton>

          <ListItemButton onClick={handleClickUser}>
            <ListItemIcon sx={{ mr: -2.5 }}>
              <GroupIcon />
            </ListItemIcon>

            <Typography
              fontWeight={500}
              sx={{ color: (theme) => theme.palette.text.primary }}
            >
              Users
            </Typography>
          </ListItemButton>
        </List>
      </Box>
    </Drawer>

    // </Stack>
  );
};

export default SystemSidebar;
