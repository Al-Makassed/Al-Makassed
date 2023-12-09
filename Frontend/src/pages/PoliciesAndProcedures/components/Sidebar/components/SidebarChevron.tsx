import React, { FC } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { SIDEBAR_CHEVRON_ID } from "src/constants";
import useSidebarContext from "src/pages/PoliciesAndProcedures/context/useSidebar";

const SidebarChevron: FC = () => {
  const {
    state: { isSidebarOpen },
    openSidebar,
  } = useSidebarContext();

  const handleDrawerOpen = () => {
    openSidebar(); // Corrected: Add parentheses to invoke the function
  };

  return (
    <IconButton
      size="large"
      aria-label="open drawer"
      onClick={handleDrawerOpen}
    >
      {isSidebarOpen ? (
        <MenuOpenIcon id={SIDEBAR_CHEVRON_ID} />
      ) : (
        <MenuIcon id={SIDEBAR_CHEVRON_ID} />
      )}
    </IconButton>
  );
};

export default SidebarChevron;
