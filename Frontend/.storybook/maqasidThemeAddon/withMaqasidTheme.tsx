
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import maqasidTheme from "../../src/style/maqasidTheme";

const withMaqasidThemeAddon = (Story, context) => {
    return (
        <ThemeProvider theme={maqasidTheme}>
            <Story {...context} />
        </ThemeProvider>
    );
};

export default withMaqasidThemeAddon;
