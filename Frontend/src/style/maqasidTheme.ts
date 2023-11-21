import { createTheme } from "@mui/material/styles";
import customMixins from "./mixins";

const maqasidTheme = createTheme({
  mixins: customMixins,
  palette: {
    primary: {
      main: "#009688",
    },
    // @deprecated - use palette.primary instead
    maqasid: {
      primary: "#009688",
    },
  },
  typography: {
    fontFamily: "Sora",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        fontFamily: "Sora",
      },
    },
  },
});

export default maqasidTheme;
