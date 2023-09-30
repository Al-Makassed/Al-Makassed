import {FC} from "react";
import {CssBaseline, Grid} from "@mui/material";
import LoginBackground from "./components/LoginBackground.tsx";
import LoginForm from "./components/LoginForm";

const Login: FC = () => {
    return (
        <Grid
            maxWidth={{xs: "300px", sm: "100%", height: "100vh"}}
            container
        >
            <CssBaseline/>
            <LoginBackground/>
            <LoginForm/>
        </Grid>
    );
};

export default Login;
