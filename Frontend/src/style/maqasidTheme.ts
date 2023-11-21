import { createTheme } from "@mui/material/styles";
import customMixins from "./mixins";
import { grey } from "@mui/material/colors";

const maqasidTheme = createTheme({
  mixins: customMixins,
  palette: {
    primary: {
      main: "#009688",
    },
    maqasid: {
      primary: "#009688",
      secondary: grey[300],
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
