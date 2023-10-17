import { createTheme } from "@mui/material/styles";
import customMixins from "./mixins";
<<<<<<< HEAD
import {green,grey} from '@mui/material/colors';


const maqasidTheme = createTheme({
    mixins: customMixins,
    palette: {
        maqasid: {
            primary: green[900],
            secondary: grey[300],
        }
    }
=======
import { green } from "@mui/material/colors";

const maqasidTheme = createTheme({
  mixins: customMixins,
  palette: {
    maqasid: {
      primary: green[900],
      secondary: green[500],
    },
  },
>>>>>>> 5832548c207134173650a834e40dd49f169d0ea7
});

export default maqasidTheme;
