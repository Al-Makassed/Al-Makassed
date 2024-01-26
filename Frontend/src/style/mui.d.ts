import { MaqasidPalette } from "./types";

declare module "@mui/material" {
  interface Palette {
    userAvatar: MaqasidPalette["userAvatar"];
    appMenu: MaqasidPalette["appMenu"];
  }

  interface PaletteOptions {
    userAvatar: MaqasidPalette["userAvatar"];
    appMenu: MaqasidPalette["appMenu"];
  }

  interface Theme {
    mixins: MaqasidThemeMixins;
    palette: Theme["palette"] & MaqasidPalette;
  }
}
