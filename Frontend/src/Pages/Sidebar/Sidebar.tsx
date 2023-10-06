import { FC, useState } from "react";

import { Divider, Drawer, Stack } from "@mui/material";
import Title from "./components/Title";
import { Theme as MuiTheme } from "@mui/material/styles";
import ListCh from "./components/ListChapter";
import SimpleDialogDemo from "./components/AddChapter";
import ArrowIcon from "./components/ArrowIcon";
declare module "@emotion/react" {
  export interface Theme extends MuiTheme {}
}
const Sidebar: FC = () => {
  const drawerWidth: number = 300;
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
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Title setOpen={setOpen} />
        <Divider
          sx={{ background: (theme) => theme.palette.maqasid.primary }}
        />
        <ListCh />
        {/* <Divider sx={{background:theme=>theme.palette.maqasid.primary}}/> */}
        <SimpleDialogDemo />
      </Drawer>
    </Stack>
  );
};

export default Sidebar;
