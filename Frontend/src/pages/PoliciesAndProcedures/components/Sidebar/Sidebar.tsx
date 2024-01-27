import React from "react";
import { useTheme } from "@mui/material/styles";
import { Divider, Drawer, Stack } from "@mui/material";
import Title from "./components/Title";
import ChaptersList from "./components/ChaptersList";
import { FC } from "react";
import useSidebarContext from "../../context/useSidebar";
import { selectIsSideDrawerVisible } from "src/features/appSettings/selectors";
import { useAppSelector } from "src/store/hooks";
import { APP_SIDE_DRAWER_WIDTH } from "src/constants";
import { useTranslation } from "react-i18next";

const Sidebar: FC = () => {
  const drawerWidth = 400;

  const theme = useTheme();
  const {
    state: { isSidebarOpen },
  } = useSidebarContext();

  const isSideDrawerVisible = useAppSelector(selectIsSideDrawerVisible);
  const { i18n } = useTranslation();

  return (
    <>
      <Stack>
        <Drawer
          sx={{
            position: "relative",
            backgroundColor: "black",
            width: { xs: "100vw", sm: drawerWidth },
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: { xs: "100vw", sm: drawerWidth },
              boxSizing: "border-box",
            },
            "& .MuiPaper-root": {
              backgroundColor: (theme) => theme.palette.grey[200],
              height: `calc(100% - 64px)`,
              mt: 8,
              transition: "all 150ms ease-in-out",
              ...(isSideDrawerVisible &&
                i18n.dir() === "rtl" && {
                  right: APP_SIDE_DRAWER_WIDTH,
                }),
              ...(isSideDrawerVisible &&
                i18n.dir() === "ltr" && {
                  left: APP_SIDE_DRAWER_WIDTH,
                }),
            },
          }}
          style={{
            ...theme.mixins.niceScroll(),
          }}
          variant="persistent"
          anchor="left"
          open={isSidebarOpen}
        >
          <Title />

          <Divider sx={{ background: "action", mt: 1.5 }} />

          <ChaptersList />
        </Drawer>
      </Stack>
    </>
  );
};

export default Sidebar;
