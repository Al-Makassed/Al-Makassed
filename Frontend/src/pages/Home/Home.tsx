import { Grid } from "@mui/material";
import { FC } from "react";
import StatisticsGrid from "./components/StatisticsGrid";

const Home: FC = () => {
  return (
    <Grid
      container
      py={2}
      px={2}
      height={{ lg: "calc(100vh - 64px)" }}
      bgcolor={(theme) => theme.palette.grey[100]}
    >
      <Grid item xs={12} lg={6.5} bgcolor="red" p={2}>
        Announcement
      </Grid>

      <Grid item xs={12} lg={5.5} pl={1}>
        <StatisticsGrid />
      </Grid>
    </Grid>
  );
};

export default Home;
