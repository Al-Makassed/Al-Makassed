import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { NAVBAR_HEIGHT } from "src/constants";
import { AppLayoutContainerProps } from "./types";

export const AppLayoutContainer = styled(Grid, {
  shouldForwardProp: (prop) => prop !== "isNavbarVisible",
  name: "AppLayoutContainer",
})<AppLayoutContainerProps>(({ theme, isNavbarVisible }) => ({
  position: "absolute",
  top: isNavbarVisible ? NAVBAR_HEIGHT : 0,
  right: 0,
  display: "block",
  overflow: "auto",
  height: `calc(100% - ${NAVBAR_HEIGHT}px)`,
  transition: ".25s",
  backgroundColor: theme.palette.grey[50],
  justifyContent: "center",
  alignItems: "center",
  ...theme.mixins.niceScroll(),
}));
