import React, { MouseEvent, useState } from "react";
import { Box, MenuItem, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import i18next from "i18next";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { amber } from "@mui/material/colors";
import { LANGUAGES } from "../constants";

const LanguageSelector = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleSelectLanguage = (code: string) => () =>
    i18next.changeLanguage(code);

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Tooltip title="Change Language">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "language-selector-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ bgcolor: amber[500], width: 30, height: 30 }}>
            <LanguageIcon sx={{ color: (theme) => theme.palette.grey[800] }} />
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        id="language-selector-menu"
        onClose={handleClose}
        onClick={handleClose}
        defaultValue={i18next.language}
        sx={{ color: "white" }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        {LANGUAGES.map(({ code, name, countryCode }) => (
          <MenuItem
            key={countryCode}
            value={code}
            onClick={handleSelectLanguage(code)}
          >
            <Typography>{name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageSelector;
