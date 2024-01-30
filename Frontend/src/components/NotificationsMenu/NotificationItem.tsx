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
import useMediaQuery from "src/hooks/useMediaQuery";

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
  const { isMobile } = useMediaQuery();

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
          primary={
            <Typography
              variant={isMobile ? "caption" : "body2"}
              sx={{ display: "flex", width: "calc(100% - 55px)" }}
            >
              {primary}
            </Typography>
          }
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
