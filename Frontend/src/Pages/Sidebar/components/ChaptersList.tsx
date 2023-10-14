import { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { CHAPTERS } from "../fixtures";
import EditIcon from "@mui/icons-material/Edit";

const ChaptersList = () => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{
        width: "100%",
        // maxWidth: 329,
        // width: "600px",
        bgcolor: (theme) => theme.palette.maqasid.secondary,
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {CHAPTERS.map((chapter, index) => (
        <>
          <Box key={index} sx={{ display: "flex", height: 55 }}>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon sx={{ mr: -2.5 }}>
                <MenuBookIcon color="action" />
              </ListItemIcon>

              <Typography
                fontWeight={600}
                sx={{ color: (theme) => theme.palette.text.primary }}
              >
                {chapter.name}
              </Typography>

              {open ? (
                <ExpandLess sx={{ ml: 2 }} />
              ) : (
                <ExpandMore sx={{ ml: 2 }} />
              )}
            </ListItemButton>

            <Tooltip title="Edit chapter">
              <IconButton aria-label="Edit chapter" sx={{ mr: 1 }}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Collapse key={index} in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon
                  sx={{ color: (theme) => theme.palette.maqasid.primary }}
                >
                  <AddCircleIcon />
                </ListItemIcon>
                {/* <ListItemText primary="Add policy" /> */}
                <Typography fontWeight={590}>Add Policy</Typography>
              </ListItemButton>
              {chapter.policies.map((pol, index) => (
                <ListItemButton key={index} sx={{ pl: 4 }}>
                  <ListItemText sx={{ pl: 6 }} primary={pol.name} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </>
      ))}
    </List>
  );
};

export default ChaptersList;
