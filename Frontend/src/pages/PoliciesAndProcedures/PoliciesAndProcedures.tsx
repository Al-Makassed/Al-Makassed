import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import SidebarChevron from "./components/Sidebar/components/SidebarChevron";
import { Box } from "@mui/material";

const PoliciesAndProcedures = () => {
  return (
    <>
      <SidebarChevron />
      <Sidebar />
      <Box pt={4}>
        <Outlet />
      </Box>
    </>
  );
};

export default PoliciesAndProcedures;
