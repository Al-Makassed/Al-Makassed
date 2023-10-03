export interface MaqasidPalette {
  primary: string;
  secondary: string;
}

export interface MaqasidThemeMixins {
  // niceScroll: (configs?: NiceScrollConfigs) => {};
  niceScroll: () => object;
  showTextOverflowEllipsis: () => object;
  removeInputNumberArrows: () => object;
  hideTextFieldBorder: () => object;
  toolbar: object;
}
