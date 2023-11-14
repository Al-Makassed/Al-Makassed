import type { Preview } from "@storybook/react";
// import { muiTheme } from 'storybook-addon-material-ui'
import withMaqasidThemeAddon from "./maqasidThemeAddon/withMaqasidTheme";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

// export const decorators = [
// 	muiTheme()
// ];
export const decorators = [
  withMaqasidThemeAddon,
]

export default preview;
