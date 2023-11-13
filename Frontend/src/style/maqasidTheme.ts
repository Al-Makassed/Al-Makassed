import { createTheme } from "@mui/material/styles";
import customMixins from "./mixins";
import { green, grey } from "@mui/material/colors";

const maqasidTheme = createTheme({
  mixins: customMixins,
  palette: {
    maqasid: {
      primary: green[800],
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
