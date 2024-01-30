// MUI
import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from "@mui/material";

// icons
import PasswordIcon from "@mui/icons-material/Password";
import UserIcon from "@mui/icons-material/PermIdentity";
import LogoutIcon from "@mui/icons-material/PowerSettingsNew";

// project imports
import { useNavigate } from "react-router-dom";

import useAccountContext from "./context/useAccountContext";

const ProfileTab = () => {
  const navigate = useNavigate();

  const { onClose, onLogOut } = useAccountContext();

  const handleProfileClick = () => {
    onClose();
    navigate("/me/profile");
  };

  const handleResetPassword = () => {
    onClose();
    navigate("/me/reset-password");
  };

  return (
    <MenuList>
      <MenuItem onClick={handleProfileClick}>
        <ListItemIcon>
          <UserIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Profile</ListItemText>
      </MenuItem>

      <MenuItem onClick={handleResetPassword}>
        <ListItemIcon>
          <PasswordIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Reset password</ListItemText>
      </MenuItem>

      <Divider />

      <MenuItem onClick={onLogOut}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </MenuList>
  );
};

export default ProfileTab;
