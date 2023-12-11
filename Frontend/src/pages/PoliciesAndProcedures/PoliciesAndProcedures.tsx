import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import SidebarChevron from "./components/Sidebar/components/SidebarChevron";
import { Stack } from "@mui/material";

const PoliciesAndProcedures = () => {
  return (
    <Stack direction="row">
      <>
        <SidebarChevron />
        <Sidebar />
      </>
      <Outlet />
    </Stack>
  );
};

export default PoliciesAndProcedures;
