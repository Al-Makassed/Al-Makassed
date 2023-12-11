import React from "react";
import { useTheme } from "@mui/material/styles";
import { Divider, Drawer, Stack } from "@mui/material";
import Title from "./components/Title";
import ChaptersList from "./components/ChaptersList";
import { FC } from "react";
import useSidebarContext from "../../context/useSidebar";

const Sidebar: FC = () => {
  const drawerWidth = 400;

  const theme = useTheme();
  const {
    state: { isSidebarOpen },
  } = useSidebarContext();

  return (
    <>
      <Stack>
        <Drawer
          sx={{
            position: "relative",
            backgroundColor: "black",
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
            "& .MuiPaper-root": {
              backgroundColor: (theme) => theme.palette.grey[200],
              height: `calc(100% - 64px)`,
              mt: 8,
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
