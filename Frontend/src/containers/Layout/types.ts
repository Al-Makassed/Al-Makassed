import { GridProps } from "@mui/material/Grid";

export interface AppLayoutContainerProps extends GridProps {
  isNavbarVisible: boolean;
  isSideDrawerVisible?: boolean;
  isMobile?: boolean;
}
