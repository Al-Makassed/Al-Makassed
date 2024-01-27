import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { NAVBAR_HEIGHT, APP_SIDE_DRAWER_WIDTH } from "src/constants";
import { AppLayoutContainerProps } from "./types";

export const AppLayoutContainer = styled(Grid, {
  shouldForwardProp: (prop) =>
    !["isNavbarVisible", "isSideDrawerVisible"].includes(prop.toString()),
  name: "AppLayoutContainer",
})<AppLayoutContainerProps>(
  ({ theme, isNavbarVisible, isSideDrawerVisible, dir }) => ({
    position: "absolute",
    top: isNavbarVisible ? NAVBAR_HEIGHT : 0,
    height: isNavbarVisible ? `calc(100% - ${NAVBAR_HEIGHT}px)` : "100%",
    right: 0,
    display: "block",
    overflow: "auto",
    transition: ".25s",
    backgroundColor: theme.palette.grey[50],
    justifyContent: "center",
    alignItems: "center",
    ...theme.mixins.niceScroll(),
    ...(isSideDrawerVisible && {
      ...(dir === "rtl"
        ? { paddingRight: APP_SIDE_DRAWER_WIDTH }
        : { paddingLeft: APP_SIDE_DRAWER_WIDTH }),
    }),
  }),
);
