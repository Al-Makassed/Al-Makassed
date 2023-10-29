import React, { FC } from "react";
import IconButton from "@mui/material/IconButton";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { toggleSidebar, selectIsSidebarOpen } from "src/features/appSettings";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { SIDEBAR_CHEVRON_ID } from "src/constants";

const SidebarChevron: FC = () => {
  const dispatch = useAppDispatch();

  const isSidebarOpen = useAppSelector(selectIsSidebarOpen);

  const handleDrawerOpen = () => {
    dispatch(toggleSidebar());
  };

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
