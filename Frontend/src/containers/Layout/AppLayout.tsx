import { FC } from "react";
import { Outlet } from "react-router-dom";
import { APP_LAYOUT_CONTAINER_ID } from "src/constants";
import Navbar from "src/containers/Navbar";
import useAppLayoutNavbar from "src/hooks/useAppLayoutNavbar";
import { AppLayoutContainer } from "./styled";
import AppSideDrawer from "src/components/AppSideDrawer";
import { useTranslation } from "react-i18next";
import useMediaQuery from "src/hooks/useMediaQuery";

const AppLayout: FC = () => {
  const { isNavbarVisible, isSideDrawerVisible } = useAppLayoutNavbar();

  const { i18n } = useTranslation();

  const { isMobile } = useMediaQuery();

  return (
    <>
      <Navbar />
      <AppSideDrawer />
      <AppLayoutContainer
        id={APP_LAYOUT_CONTAINER_ID}
        container
        isNavbarVisible={isNavbarVisible}
        isSideDrawerVisible={isSideDrawerVisible}
        dir={i18n.dir()}
        isMobile={isMobile}
      >
        <Outlet />
      </AppLayoutContainer>
    </>
  );
};

export default AppLayout;
