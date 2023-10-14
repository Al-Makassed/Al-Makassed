import { createTheme } from "@mui/material/styles";
import customMixins from "./mixins";
import { green } from "@mui/material/colors";

const maqasidTheme = createTheme({
  mixins: customMixins,
  palette: {
    maqasid: {
      primary: green[900],
      secondary: green[500],
    },
  },
});

export default maqasidTheme;
