import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import VerticalLinearStepper from "./components/VerticalLinearStepper";
import Sidebar from "./components/Sidebar";
import SidebarChevron from "./components/Sidebar/components/SidebarChevron";

const PoliciesAndProcedures = () => {
  const location = useLocation();

  const shouldRender = location.pathname === "/me/policies-and-procedures";
  return (
    <>
      <Sidebar />
      {shouldRender ? (
        <>
          <SidebarChevron /> <VerticalLinearStepper />
        </>
      ) : null}
      <Outlet />
    </>
  );
};

export default PoliciesAndProcedures;
