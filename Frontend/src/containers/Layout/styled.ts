import { styled } from "@mui/material/styles";
import Grid, { GridProps } from "@mui/material/Grid";
import { NAVBAR_HEIGHT } from "src/constants";

export const AppLayoutContainer = styled(Grid)<GridProps>(({ theme }) => ({
  position: "absolute",
  top: NAVBAR_HEIGHT,
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
