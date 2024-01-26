import { Grid, Stack } from "@mui/material";
import { FC } from "react";
import StatisticsGrid from "./components/StatisticsGrid";

const Home: FC = () => {
  return (
    <Grid
      container
      py={2}
      px={2}
      height={{ xs: "100%", lg: "calc(100vh - 64px)" }}
      // bgcolor={(theme) => theme.palette.grey[100]}
      sx={{
        background: `linear-gradient(to bottom left, #0096881a, #ffffff 75%)`,
      }}
    >
      <Grid item xs={12} lg={6.5} pr={{ lg: 2 }}>
        <Stack bgcolor="pink">Announcement</Stack>
      </Grid>

      <Grid item xs={12} lg={5.5}>
        <StatisticsGrid />
      </Grid>
    </Grid>
  );
};

export default Home;
