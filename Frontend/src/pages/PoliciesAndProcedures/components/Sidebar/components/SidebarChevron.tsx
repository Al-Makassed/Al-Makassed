import ListIcon from "@mui/icons-material/List";
import { Button, Tooltip } from "@mui/material";
import { FC } from "react";
import useSidebarContext from "src/pages/PoliciesAndProcedures/context/useSidebar";

const SidebarChevron: FC = () => {
  const { openSidebar } = useSidebarContext();

  const handleDrawerOpen = () => {
    openSidebar();
  };

  return (
    <Tooltip title="Open Sidebar">
      <Button
        sx={{
          left: -40,
          padding: 2,
          borderRadius: 10,
          transition: "left 200ms ease-in-out",
          mt: 3,
          boxShadow: "0rem 0.185rem 0.25rem rgba(0,0,0,.075)",
          bgcolor: "grey.300",
          "&:hover": {
            bgcolor: "grey.300",
            left: -28,
          },
          position: "absolute",
          width: 90,
        }}
        onClick={handleDrawerOpen}
      >
        <ListIcon color="action" sx={{ ml: "auto" }} />
      </Button>
    </Tooltip>
  );
};

export default SidebarChevron;
