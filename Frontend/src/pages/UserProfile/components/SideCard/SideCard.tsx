import {
  Box,
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FC } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import { ChoiceName } from "../../constants";
import { SideCardProps } from "../../types";

const choices = [
  {
    name: ChoiceName.Home,
    icon: <HomeIcon />,
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
    <Card sx={{ py: 1 }}>
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
    </Card>
  );
};

export default SideCard;
