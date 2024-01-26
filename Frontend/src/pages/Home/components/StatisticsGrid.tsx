import { Grid, Stack } from "@mui/material";
import { FC } from "react";
import LastAccessedListCard from "./LastAccessedListCard";
import ProgressCard from "./ProgressCard";
import RecentlyAddedCard from "./RecentlyAddedCard";

const StatisticsGrid: FC = () => {
  return (
    <Grid
      container
      height={{ lg: "calc(100vh - 48px - 64px - 32px)" }}
      rowGap={1}
    >
      <Grid xs={12} sm={6} item height="fit-content" pr={{ sm: 1.5 }}>
        <Stack gap={1.5}>
          <ProgressCard />
          <RecentlyAddedCard />
        </Stack>
      </Grid>

      <Grid xs={12} sm={6} item>
        <LastAccessedListCard />
      </Grid>
    </Grid>
  );
};

export default StatisticsGrid;
