import React, { FC } from "react";
import Navbar from "src/components/Navbar";
import Sidebar from "src/components/Sidebar";
import { AppLayoutContainer } from "./styled";
import { Outlet } from "react-router-dom";

const AppLayout: FC = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <AppLayoutContainer container>
        <Outlet />
      </AppLayoutContainer>
    </>
  );
};

export default AppLayout;
