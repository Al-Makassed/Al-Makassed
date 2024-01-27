import { MaqasidPalette } from "./types";

declare module "@mui/material" {
  interface Palette {
    userAvatar: MaqasidPalette["userAvatar"];
    progressBar: MaqasidPalette["progressBar"];
  }

  interface PaletteOptions {
    userAvatar: MaqasidPalette["userAvatar"];
    progressBar: MaqasidPalette["progressBar"];
  }

  interface Theme {
    mixins: MaqasidThemeMixins;
    palette: Theme["palette"] & MaqasidPalette;
  }
}
