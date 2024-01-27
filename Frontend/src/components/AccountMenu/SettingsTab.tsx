// MUI
import { ListItemIcon, ListItemText, MenuItem, MenuList } from "@mui/material";

// icons
import FeedbackIcon from "@mui/icons-material/Feedback";
import SupportIcon from "@mui/icons-material/HelpOutline";
import HistoryIcon from "@mui/icons-material/ManageHistory";
import AccountIcon from "@mui/icons-material/PermIdentity";
import SecurityIcon from "@mui/icons-material/Security";

// project imports
import { noop } from "src/utils";

const SettingsTab = () => {
  return (
    <MenuList>
      <MenuItem onClick={noop} disabled>
        <ListItemIcon>
          <SupportIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Support</ListItemText>
      </MenuItem>

      <MenuItem onClick={noop} disabled>
        <ListItemIcon>
          <AccountIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Account Settings</ListItemText>
      </MenuItem>

      <MenuItem onClick={noop} disabled>
        <ListItemIcon>
          <SecurityIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Privacy Center</ListItemText>
      </MenuItem>

      <MenuItem onClick={noop} disabled>
        <ListItemIcon>
          <FeedbackIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Feedback</ListItemText>
      </MenuItem>

      <MenuItem onClick={noop} disabled>
        <ListItemIcon>
          <HistoryIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>History</ListItemText>
      </MenuItem>
    </MenuList>
  );
};

export default SettingsTab;
