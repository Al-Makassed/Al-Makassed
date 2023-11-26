import { MaqasidPalette } from "./types";

declare module "@mui/material" {
  interface Palette {
    userAvatar: MaqasidPalette["userAvatar"];
  }

  interface PaletteOptions {
    userAvatar: MaqasidPalette["userAvatar"];
  }

  interface Theme {
    mixins: MaqasidThemeMixins;
    palette: Theme["palette"] & MaqasidPalette;
  }
}
