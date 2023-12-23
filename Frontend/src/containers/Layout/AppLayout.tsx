import { FC } from "react";
import { Outlet } from "react-router-dom";
import { APP_LAYOUT_CONTAINER_ID } from "src/constants";
import Navbar from "src/containers/Navbar";
import useAppLayoutNavbar from "src/hooks/useAppLayoutNavbar";
import { AppLayoutContainer } from "./styled";

const AppLayout: FC = () => {
  const { isNavbarVisible } = useAppLayoutNavbar();

  return (
    <>
      <Navbar />
      <AppLayoutContainer
        id={APP_LAYOUT_CONTAINER_ID}
        container
        isNavbarVisible={isNavbarVisible}
      >
        <Outlet />
      </AppLayoutContainer>
    </>
  );
};

export default AppLayout;
