import { noop } from "src/utils/functionsUtils";
import { MixinsOptions } from "@mui/material/styles/createMixins";

export interface MaqasidPalette {
  primary: string;
}

export interface MaqasidThemeMixins extends MixinsOptions {
  /* eslint-disable @typescript-eslint/ban-types */
  niceScroll: (width?: number) => {};
  showTextOverflowEllipsis: typeof noop;
  removeInputNumberArrows: typeof noop;
  hideTextFieldBorder: typeof noop;
}
