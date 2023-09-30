import {Avatar, Grid} from "@mui/material";
import maqasidLogo from "../../../images/logo.jpg";

const LoginBackground = () => {
    return (
        <Grid
            item
            sm={4}
            md={5}
            sx={{
                width: "100%",
                bgcolor: theme => theme.palette.maqasid.primary,
                alignItems: "center",
                display: {
                    xs: "none",
                    sm: "flex",
                },
                justifyContent: "center",
            }}
        >
            <Avatar
                alt="logo"
                variant="circular"
                sx={{
                    width: 180,
                    height: 180,
                }}
                src={maqasidLogo}
            />
        </Grid>
    );
};

export default LoginBackground;
