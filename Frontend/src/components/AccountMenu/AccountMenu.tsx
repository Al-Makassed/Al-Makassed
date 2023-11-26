import ArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Logout from "@mui/icons-material/Logout";
import PasswordIcon from "@mui/icons-material/Password";
import Settings from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { FC, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserAvatar from "src/components/UserAvatar";
import { ACCESS_TOKEN_KEY } from "src/constants/localStorage";
import { logout, selectUser } from "src/features/user";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { noop } from "src/utils";
import getAvatarAbbreviation from "src/utils/getAvatarAbbreviation";
import useMediaQuery from "src/hooks/useMediaQuery";

const AccountMenu: FC = () => {
  const dispatch = useAppDispatch();

  const { isMobile } = useMediaQuery();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const { userName, avatarUrl } = useAppSelector(selectUser);

  const userInitial = getAvatarAbbreviation(userName);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <Tooltip title="Account settings">
        <Button
          onClick={handleClick}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          startIcon={<UserAvatar src={avatarUrl} initials={userInitial} />}
          sx={{
            textTransform: "none",
            color: (theme) => theme.palette.grey[50],
          }}
        >
          {!isMobile && userName}
          <ArrowDownIcon />
        </Button>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={noop}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={noop}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={noop}>
          <ListItemIcon>
            <PasswordIcon fontSize="small" />
          </ListItemIcon>
          Reset password
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;
