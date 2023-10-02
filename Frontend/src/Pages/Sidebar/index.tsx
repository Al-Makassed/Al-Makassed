import { FC, useState } from "react";
import Heade from "./MenuIcon";
import { useTheme } from "@emotion/react";
import { Box, CssBaseline, Divider, Drawer } from "@mui/material";
import Title from "./Title";
import { Theme as MuiTheme } from "@mui/material/styles";
import ListCh from "./ListChapter";
import SimpleDialogDemo from "./AddChapter";

declare module "@emotion/react" {
  export interface Theme extends MuiTheme {}
}
const Index: FC = () => {
  const theme = useTheme();
  const drawerWidth: number = 240;
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />{" "}
      <Heade open={open} setOpen={setOpen} />
      <Drawer
        sx={{
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
        <Title setOpen={setOpen} theme={theme} />
        <Divider />
        <ListCh />
        <Divider />
        < SimpleDialogDemo />
      </Drawer>
    </Box>
  );
};

export default Index;
