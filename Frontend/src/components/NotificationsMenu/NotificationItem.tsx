// MUI
import {
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  SxProps,
  Typography,
  Avatar,
} from "@mui/material";
import { amber, green, lightBlue } from "@mui/material/colors";

// icons
import GiftIcon from "@mui/icons-material/CardGiftcard";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/WarningAmber";

// project imports
import { NotificationItemProps, NotificationType } from "./types";

const notificationSx: Record<NotificationType, SxProps> = {
  info: {
    color: "info.main",
    bgcolor: lightBlue[50],
  },
  warning: {
    color: "warning.main",
    bgcolor: amber[50],
  },
  anniversary: {
    color: "success.main",
    bgcolor: green[50],
  },
};

const notificationIcons: Record<NotificationType, JSX.Element> = {
  info: <InfoIcon />,
  warning: <WarningIcon />,
  anniversary: <GiftIcon />,
};

const NotificationItem = ({
  type,
  content: { primary, secondary, time },
}: NotificationItemProps) => {
  return (
    <>
      <ListItemButton>
        <ListItemAvatar>
          <Avatar
            sx={{
              ...notificationSx[type],
            }}
          >
            {notificationIcons[type]}
          </Avatar>
        </ListItemAvatar>

        <ListItemText
          primary={<Typography variant="body2">{primary}</Typography>}
          secondary={secondary}
        />

        <ListItemSecondaryAction>
          <Typography variant="caption" noWrap>
            {time}
          </Typography>
        </ListItemSecondaryAction>
      </ListItemButton>
    </>
  );
};

export default NotificationItem;
