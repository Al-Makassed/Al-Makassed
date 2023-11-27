import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { toggleSidebar, selectIsSidebarOpen } from "src/features/appSettings";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { SIDEBAR_CHEVRON_ID } from "src/constants";

const SidebarChevron: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector(selectIsSidebarOpen);

  const handleDrawerOpen = () => {
    dispatch(toggleSidebar());
  };

  // Check if the current path is "/me/policies-and-procedures"
  const shouldRender = location.pathname === "/me/policies-and-procedures";

  if (!shouldRender) {
    return null; // Don't render the component if the path doesn't match
  }

  return (
    <IconButton
      size="large"
      aria-label="open drawer"
      onClick={handleDrawerOpen}
    >
      {isSidebarOpen ? (
        <MenuOpenIcon sx={{ color: "white" }} id={SIDEBAR_CHEVRON_ID} />
      ) : (
        <MenuIcon sx={{ color: "white" }} id={SIDEBAR_CHEVRON_ID} />
      )}
    </IconButton>
  );
};

export default SidebarChevron;
