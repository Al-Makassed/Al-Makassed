import { noop } from "src/utils/functionsUtils";
import { MixinsOptions } from "@mui/material/styles/createMixins";

export interface MaqasidPalette {
  primary: string;
  secondary: string;
}

export interface MaqasidThemeMixins extends MixinsOptions {
  // niceScroll: (configs?: NiceScrollConfigs) => {};
  niceScroll: typeof noop;
  showTextOverflowEllipsis: typeof noop;
  removeInputNumberArrows: typeof noop;
  hideTextFieldBorder: typeof noop;
}
