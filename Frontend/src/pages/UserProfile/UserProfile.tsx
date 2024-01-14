import { Grid } from "@mui/material";
import { FC } from "react";
import InformationCard from "./components/InformationCard/InformationCard";
import SideCard from "./components/SideCard";

const UserProfile: FC = () => {
  return (
    <Grid
      container
      sx={{
        bgcolor: "grey.100",
        p: { xs: 2, md: 3 },
        height: "calc(100vh - 64px)",
      }}
    >
      <Grid item xs={0} md={4} pr={1} display={{ xs: "none", md: "block" }}>
        <SideCard />
      </Grid>

      <Grid item xs={12} md={8} pl={{ xs: 0, sm: 2 }}>
        <Grid item>
          <InformationCard />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
