// MUI
import {
  Badge,
  Box,
  Divider,
  IconButton,
  ListItemButton,
  ListItemText,
  Menu,
  Typography,
} from "@mui/material";

// icons
import CloseIcon from "@mui/icons-material/Close";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

// project imports
import { MouseEvent, useState } from "react";
import MainCard from "../MainCard";
import NotificationItem from "./NotificationItem";
import { NOTIFICATIONS } from "./fixtures";

const NotificationsMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <IconButton
        onClick={handleClick}
        // size="small"
        aria-controls={open ? "language-selector-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Badge badgeContent={NOTIFICATIONS.length} color="error">
          <NotificationsNoneIcon
            sx={{ color: (theme) => theme.palette.grey[100] }}
          />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        id="notifications-menu"
        onClose={handleClose}
        onClick={handleClose}
        sx={{ color: "white" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MainCard
          title="Notifications"
          elevation={0}
          border={false}
          content={false}
          secondary={
            <IconButton size="small" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          }
          sx={{
            width: "500px",
          }}
        >
          {NOTIFICATIONS.map((item) => (
            <NotificationItem key={item.id} {...item} />
          ))}

          <Divider />

          <ListItemButton
            sx={{ textAlign: "center", py: `${12}px !important` }}
          >
            <ListItemText
              primary={
                <Typography variant="subtitle2" color="primary">
                  View All
                </Typography>
              }
            />
          </ListItemButton>
        </MainCard>
      </Menu>
    </Box>
  );
};

export default NotificationsMenu;
