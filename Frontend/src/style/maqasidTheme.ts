import { createTheme } from "@mui/material/styles";
import customMixins from "./mixins";
import { USER_AVATAR_PALETTE } from "./palettes/userAvatar";
import { PROGRESS_BAR_PALETTE } from "./palettes/progressBar";

const maqasidTheme = createTheme({
  mixins: customMixins,
  palette: {
    primary: {
      main: "#009688",
    },
    userAvatar: USER_AVATAR_PALETTE,
    progressBar: PROGRESS_BAR_PALETTE,
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
