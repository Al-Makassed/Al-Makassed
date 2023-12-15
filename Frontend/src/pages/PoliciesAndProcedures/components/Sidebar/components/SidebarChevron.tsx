import React, { FC } from "react";
import ListIcon from "@mui/icons-material/List";
import useSidebarContext from "src/pages/PoliciesAndProcedures/context/useSidebar";
import { Button, Tooltip } from "@mui/material";

const SidebarChevron: FC = () => {
  const { openSidebar } = useSidebarContext();

  const handleDrawerOpen = () => {
    openSidebar();
  };

  return (
    <Tooltip title="Open Sidebar">
      <Button
        sx={{
          left: -30,
          padding: 2,
          borderRadius: 10,
          mt: 3,
          bgcolor: "grey.300",
          "&:hover": {
            bgcolor: "grey.400",
            left: -20,
          },
          position: "absolute",
        }}
        onClick={handleDrawerOpen}
      >
        <ListIcon color="action" sx={{ ml: 3 }} />
      </Button>
    </Tooltip>
  );
};

export default SidebarChevron;
