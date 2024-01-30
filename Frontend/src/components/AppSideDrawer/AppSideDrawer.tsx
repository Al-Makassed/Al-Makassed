import { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  selectIsNavbarVisible,
  selectIsSideDrawerVisible,
} from "src/features/appSettings/selectors";
import { useAppSelector } from "src/store/hooks";
import AppMenu from "../AppMenu";
import { StyledDrawer } from "./styled";

const AppSideDrawer: FC = () => {
  const isSidebarOpen = useAppSelector(selectIsSideDrawerVisible);
  const isNavbarVisible = useAppSelector(selectIsNavbarVisible);

  const { i18n } = useTranslation();

  return (
    <StyledDrawer
      variant="persistent"
      open={isSidebarOpen}
      anchor={i18n.dir() === "rtl" ? "right" : "left"}
      isNavbarVisible={isNavbarVisible}
    >
      <AppMenu />
    </StyledDrawer>
  );
};

export default AppSideDrawer;
