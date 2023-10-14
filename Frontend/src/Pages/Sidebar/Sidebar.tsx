import { FC, useState } from "react";
import { Divider, Drawer, Stack } from "@mui/material";
import Title from "./components/Title";
import ChaptersList from "./components/ChaptersList";
import SimpleDialogDemo from "./components/AddChapter";
import ArrowIcon from "./components/ArrowIcon";

const Sidebar: FC = () => {
  const drawerWidth = 400;
  const [open, setOpen] = useState<boolean>(true);

  return (
    <Stack>
      <ArrowIcon open={open} setOpen={setOpen} />
      <Drawer
        sx={{
          backgroundColor: "black",
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          "& .MuiPaper-root": {
            backgroundColor: theme => theme.palette.maqasid.secondary,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Title setOpen={setOpen} />
        <Divider
          sx={{ background: (theme) => theme.palette.maqasid.primary }}
        />
        <ChaptersList />
        {/* <Divider sx={{background:theme=>theme.palette.maqasid.primary}}/> */}
        <SimpleDialogDemo />
      </Drawer>
    </Stack>
  );
};

export default Sidebar;
