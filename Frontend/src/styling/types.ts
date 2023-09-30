export interface MaqasidPalette {
    primary: string;
    secondary: string;
}

export interface MaqasidThemeMixins {
    // niceScroll: (configs?: NiceScrollConfigs) => {};
    niceScroll: () => {};
    showTextOverflowEllipsis: () => {};
    removeInputNumberArrows: () => {};
    hideTextFieldBorder: () => {};
    toolbar: any;
}