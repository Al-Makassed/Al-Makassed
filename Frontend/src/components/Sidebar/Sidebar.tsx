import React, { FC } from "react";
import { Drawer, Stack } from "@mui/material";
import Title from "./components/Title";
import ChaptersList from "./components/ChaptersList";
import AddChapterButton from "./components/AddChapterButton";
import { useAppSelector } from "src/app/hooks";
import { selectIsSidebarOpen } from "src/features/appSettings";

const Sidebar: FC = () => {
  const drawerWidth = 400;

  const isOpen = useAppSelector(selectIsSidebarOpen);

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
            // backgroundColor: (theme) => theme.palette.grey[200],
            mt: 8,
          },
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
