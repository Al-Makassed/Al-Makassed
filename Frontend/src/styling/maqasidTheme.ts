import {createTheme} from '@mui/material/styles';
import customMixins from "./mixins";
import {green} from '@mui/material/colors';


const maqasidTheme = createTheme({
    mixins: customMixins,
    palette: {
        maqasid: {
            primary: green[900],
            secondary:"#F0F0F0",
            
        }
    }
});

export default maqasidTheme;