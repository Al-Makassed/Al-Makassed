import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import SidebarChevron from "./components/Sidebar/components/SidebarChevron";

const PoliciesAndProcedures = () => {
  return (
    <>
      <SidebarChevron />
      <Sidebar />
      <Outlet />
    </>
  );
};

export default PoliciesAndProcedures;
