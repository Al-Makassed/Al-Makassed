import React, { FC } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { SIDEBAR_CHEVRON_ID } from "src/constants";
import useSidebarContext from "src/pages/PoliciesAndProcedures/context/useSidebar";

const SidebarChevron: FC = () => {
  const { openSidebar } = useSidebarContext();

  const handleDrawerOpen = () => {
    openSidebar();
  };

  return (
    <IconButton
      sx={{
        width: "80px",
        height: "80px",
        left: -40,
        mt: 2,
        bgcolor: "grey.400",
      }}
      aria-label="open drawer"
      onClick={handleDrawerOpen}
    >
      <MenuIcon sx={{ ml: 3 }} id={SIDEBAR_CHEVRON_ID} />
    </IconButton>
  );
};

export default SidebarChevron;
