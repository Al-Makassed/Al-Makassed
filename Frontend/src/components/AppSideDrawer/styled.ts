import Drawer, { DrawerProps } from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { APP_SIDE_DRAWER_WIDTH, NAVBAR_HEIGHT } from "src/constants";

export interface StyledDrawerProps extends DrawerProps {
  isNavbarVisible?: boolean;
}

export const StyledDrawer = styled(Drawer, {
  name: "AppSideDrawer",
  shouldForwardProp: (prop) => !["isNavbarVisible"].includes(prop.toString()),
})<StyledDrawerProps>(({ theme, isNavbarVisible }) => ({
  width: APP_SIDE_DRAWER_WIDTH,
  flexShrink: 0, // don't shrink when the window is too small
  "& .MuiDrawer-paper": {
    width: APP_SIDE_DRAWER_WIDTH,
    boxSizing: "border-box",
    backgroundColor: theme.palette.appMenu.menuBackground,
    ...(isNavbarVisible && {
      top: NAVBAR_HEIGHT,
    }),
  },
}));
