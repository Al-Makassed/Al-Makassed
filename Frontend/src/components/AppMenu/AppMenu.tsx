import List from "@mui/material/List";
import { FC } from "react";
import { useLocation } from "react-router-dom";
import useAppMenuNavigation from "src/routes/hooks/useAppMenuNavigation";
import theme from "src/style/maqasidTheme";
import AppMenuItem from "../AppMenuItem";
import { hasSelectedChild } from "./utils";

const AppMenu: FC = () => {
  const { appMenuItems } = useAppMenuNavigation();

  useLocation(); // This will re-render the component on route change 🫡

  return (
    <List
      sx={{
        "& .MuiList-root": {
          ...theme.mixins.niceScroll(),
        },
      }}
      component="nav"
    >
      {appMenuItems.map((item, index) => {
        const doesHaveSelectedChild = hasSelectedChild(item);
        return (
          <AppMenuItem
            key={index}
            {...item}
            hasSelectedChild={doesHaveSelectedChild}
          />
        );
      })}
    </List>
  );
};

export default AppMenu;
