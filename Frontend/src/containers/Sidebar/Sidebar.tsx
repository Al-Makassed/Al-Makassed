import React from "react";
import { useTheme } from "@mui/material/styles";
import { Drawer, Stack } from "@mui/material";
import Title from "./components/Title";
import ChaptersList from "./components/ChaptersList";
import AddChapterButton from "./components/AddChapterButton";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { selectIsSidebarOpen, closeSidebar } from "src/features/appSettings";
import { useLocation } from "react-router-dom";
import { FC, useEffect } from "react";

const Sidebar: FC = () => {
  const drawerWidth = 400;

  const theme = useTheme();
  const isOpen = useAppSelector(selectIsSidebarOpen);

  const location = useLocation();
  const dispatch = useAppDispatch();

  // Add an effect to listen for route changes and close the sidebar
  useEffect(() => {
    if (isOpen) {
      dispatch(closeSidebar());
    }
  }, [location, dispatch]);

  return (
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
            height: `calc(100% - 115px)`,
            mt: 8,
          },
        }}
        style={{
          ...theme.mixins.niceScroll(),
        }}
        variant="persistent"
        anchor="left"
        open={isOpen}
      >
        <Title />
        <ChaptersList />
        <AddChapterButton />
      </Drawer>
    </Stack>
  );
};

export default Sidebar;
