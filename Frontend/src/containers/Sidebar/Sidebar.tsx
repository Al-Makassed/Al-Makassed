import React, { FC } from "react";
import { Drawer, Stack } from "@mui/material";
import Title from "./components/Title";
import ChaptersList from "./components/ChaptersList";
import AddChapterButton from "./components/AddChapterButton";
import { useAppSelector } from "src/store/hooks";
import { selectIsSidebarOpen } from "src/features/appSettings";
import { useTheme } from "@mui/material/styles";
import { selectUserRoles } from "src/features/user";

const Sidebar: FC = () => {
  const drawerWidth = 400;

  const theme = useTheme();

  const isOpen = useAppSelector(selectIsSidebarOpen);

  const userRole = useAppSelector(selectUserRoles)[0];

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
            height: userRole === "Admin" ? `calc(100% - 115px)` : `calc(91%)`,
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
        {userRole === "Admin" && <AddChapterButton />}
      </Drawer>
    </Stack>
  );
};

export default Sidebar;
