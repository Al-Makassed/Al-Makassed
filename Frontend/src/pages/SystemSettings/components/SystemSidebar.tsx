import BusinessIcon from "@mui/icons-material/Business";
import GroupIcon from "@mui/icons-material/Group";
import FieldIcon from "@mui/icons-material/QuizOutlined";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Category } from "../constants";

const drawerWidth = 300;

const drawerItems = [
  {
    name: "Departments",
    icon: <BusinessIcon />,
    path: "department",
    type: Category.Departments,
  },
  {
    name: "Fields",
    icon: <FieldIcon />,
    path: "field",
    type: Category.Fields,
  },
  {
    name: "Users",
    icon: <GroupIcon />,
    path: "user",
    type: Category.Users,
  },
];

const SystemSidebar: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  // TODO: keep the state of the selected category in sync with the url

  const navigate = useNavigate();

  const handleClick = (category: Category) => {
    setSelectedCategory(category);
    navigate(category.toLowerCase());
  };

  return (
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

        display: { xs: "none", sm: "block" },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box>
        <Typography
          variant="h6"
          sx={{
            py: 1,
            px: 2,
            fontWeight: 500,
            color: (theme) => theme.palette.text.primary,
          }}
        >
          System Settings
        </Typography>
        <Divider />
      </Box>
      <Stack>
        <List>
          {drawerItems.map((item) => (
            <ListItemButton
              key={item.name}
              onClick={() => handleClick(item.type)}
              sx={{
                bgcolor:
                  selectedCategory === item.type
                    ? (theme) => theme.palette.grey[300]
                    : "transparent",
                height: 50,
              }}
            >
              <ListItemIcon sx={{ minWidth: "fit-content", pr: 1.5 }}>
                {item.icon}
              </ListItemIcon>

              <Typography
                fontWeight={500}
                sx={{ color: (theme) => theme.palette.text.primary }}
              >
                {item.name}
              </Typography>
            </ListItemButton>
          ))}
        </List>
      </Stack>
    </Drawer>
  );
};

export default SystemSidebar;
