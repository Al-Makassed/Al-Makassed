import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import SidebarChevron from "./components/Sidebar/components/SidebarChevron";
import VerticalLinearStepper from "./components/VerticalLinearStepper";

const PoliciesAndProcedures = () => {
  return (
    <>
      <Sidebar />
      <SidebarChevron />
      <VerticalLinearStepper />
      <Outlet />
    </>
  );
};

export default PoliciesAndProcedures;
