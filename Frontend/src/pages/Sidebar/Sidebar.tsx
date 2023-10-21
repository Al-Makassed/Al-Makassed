import React, { FC, useState } from "react";
import { Drawer, Stack } from "@mui/material";
import Title from "./components/Title";
import ChaptersList from "./components/ChaptersList";
import AddChapter from "./components/AddChapter";
import ArrowIcon from "./components/ArrowIcon";

const Sidebar: FC = () => {
  const drawerWidth = 400;
  const [open, setOpen] = useState<boolean>(true);

  return (
    <Stack>
      <ArrowIcon open={open} setOpen={setOpen} />
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
            mt: 8,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Title setOpen={setOpen} />

        <ChaptersList />

        <AddChapter />
      </Drawer>
    </Stack>
  );
};

export default Sidebar;
