import HistoryIcon from "@mui/icons-material/History";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Box,
  Card,
  Divider,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { ChoiceName } from "../constants";
import { Choice, SideCardProps } from "../types";
import SendIcon from "@mui/icons-material/SendRounded";

const choices: Choice[] = [
  {
    name: ChoiceName.Home,
    icon: <HomeIcon />,
  },

  {
    name: ChoiceName.Activity,
    icon: <HistoryIcon />,
  },
  {
    name: ChoiceName.Details,
    icon: <SettingsIcon />,
  },
];

const SideCard: FC<SideCardProps> = ({ choice, setChoice }) => {
  const handleClick = (choice: ChoiceName) => {
    setChoice(choice);
  };

  return (
    <Card sx={{ py: 1, height: "calc(100vh - 64px - 20px - 20px)" }}>
      <Stack height="100%">
        <Box sx={{ width: "100%" }}>
          <List>
            {choices.map(({ name, icon }) => (
              <ListItem
                disablePadding
                key={name}
                sx={{
                  bgcolor:
                    choice === name
                      ? (theme) => theme.palette.grey[200]
                      : "transparent",
                  transition: "all 0.3s ease",
                }}
              >
                <ListItemButton onClick={() => handleClick(name)}>
                  <ListItemIcon sx={{ minWidth: "fit-content", mr: 1 }}>
                    {icon}
                  </ListItemIcon>

                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        <Stack mt="auto" p={3} pb={7} gap={4}>
          <Divider />

          <Stack justifyContent="center" alignItems="center" gap={1}>
            <Typography
              variant="caption"
              color="GrayText"
              textAlign="center"
              maxWidth="90%"
            >
              If you face any conflict, don't forget to report to QA department
            </Typography>

            <Link
              fontSize="0.9rem"
              href="mailto:qa@almakassed.org"
              underline="hover"
              display="flex"
              alignItems="center"
              gap={0.35}
            >
              <SendIcon sx={{ fontSize: "0.8rem" }} />
              contact
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default SideCard;
