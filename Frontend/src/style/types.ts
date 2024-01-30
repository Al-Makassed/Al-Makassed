import { noop } from "src/utils/functionsUtils";
import { MixinsOptions } from "@mui/material/styles/createMixins";
import { USER_AVATAR_PALETTE, APP_SIDE_DRAWER_PALETTE } from "./palettes";

export interface MaqasidPalette {
  userAvatar: typeof USER_AVATAR_PALETTE;
  appMenu: typeof APP_SIDE_DRAWER_PALETTE;
}

export interface MaqasidThemeMixins extends MixinsOptions {
  /* eslint-disable @typescript-eslint/ban-types */
  niceScroll: (width?: number) => {};
  showTextOverflowEllipsis: typeof noop;
  removeInputNumberArrows: typeof noop;
  hideTextFieldBorder: typeof noop;
}
