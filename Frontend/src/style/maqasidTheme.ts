import { createTheme } from "@mui/material/styles";
import customMixins from "./mixins";
import { USER_AVATAR_PALETTE } from "./palettes/userAvatar";

const maqasidTheme = createTheme({
  mixins: customMixins,
  palette: {
    primary: {
      main: "#009688",
    },
    userAvatar: USER_AVATAR_PALETTE,
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
