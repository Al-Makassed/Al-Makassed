import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import SidebarChevron from "./components/Sidebar/components/SidebarChevron";
import { Box } from "@mui/material";
import useSidebarContext from "./context/useSidebar";

const PoliciesAndProcedures = () => {
  const {
    state: { isSidebarOpen },
  } = useSidebarContext();

  return (
    <>
      <Sidebar />

      <Box
        sx={{
          position: "relative",
          pl: isSidebarOpen ? "400px" : "40px",
          transition: "padding-left 350ms ease-in-out",
        }}
      >
        <SidebarChevron />
        <Outlet />
      </Box>
    </>
  );
};

export default PoliciesAndProcedures;
