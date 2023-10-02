import {createTheme} from '@mui/material/styles';
import customMixins from "./mixins";
import {green,grey} from '@mui/material/colors';


const maqasidTheme = createTheme({
    mixins: customMixins,
    palette: {
        maqasid: {
            primary: green[900],
            secondary: grey[300],
        }
    }
});

export default maqasidTheme;