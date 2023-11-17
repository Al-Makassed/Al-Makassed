import { MaqasidPalette } from "./types.ts";

declare module "@mui/material" {
  interface Palette {
    maqasid: MaqasidPalette;
  }

  interface PaletteOptions {
    maqasid: MaqasidPalette;
  }

  interface Theme {
    mixins: MaqasidThemeMixins;
  }
}
