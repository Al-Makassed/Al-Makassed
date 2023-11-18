import React, { FC, useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AddIcon from "@mui/icons-material/Add";
import { Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import { ChapterListItemProps } from "../types";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import { useAppDispatch } from "src/store/hooks";
import { toggleSidebar } from "src/features/appSettings";
import LoaderCell from "src/components/LoaderCell";
import useFetchPolicies from "src/pages/ViewPolicy/hooks/useGetPolicies";
import { useNavigate } from "react-router-dom";

const ChapterListItem: FC<ChapterListItemProps> = ({ chapter }) => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleEditChapter = () => {
    dispatch(toggleSidebar());

    navigate(`/me/chapter/edit/${chapter.id}`);
  };
  const handleClick = () => setOpen(!open);

  const { isFetching } = useFetchPolicies();

  if (isFetching) return <LoaderCell size={38} color="success" />;

  const dispatch = useAppDispatch();

  return (
    <>
      <Box sx={{ display: "flex", height: 55 }}>
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

          {open ? <ExpandLess sx={{ ml: 2 }} /> : <ExpandMore sx={{ ml: 2 }} />}
        </ListItemButton>

        <Tooltip title="Edit chapter">
          <IconButton
            aria-label="Edit chapter"
            sx={{ mr: 1 }}
            onClick={handleEditChapter}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {chapter.policies.map((policy, index) => (
            <ListItemButton
              onClick={() => {
                navigate(`chapters/${chapter.id}/policies/${policy.code}`),
                  dispatch(toggleSidebar());
              }}
              key={index}
              sx={{ pl: 4 }}
            >
              <ListItemIcon sx={{ mr: -2.5 }}>
                <AssuredWorkloadIcon />
              </ListItemIcon>
              <ListItemText primary={policy.name} />
            </ListItemButton>
          ))}
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon
              sx={{
                color: (theme) => theme.palette.maqasid.primary,
                mr: -2.5,
              }}
            >
              <AddIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Add policy" /> */}
            <Typography fontWeight={590}>Add Policy</Typography>
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
};

export default ChapterListItem;
