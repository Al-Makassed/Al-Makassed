import { Grid, Stack, useTheme, Theme } from "@mui/material";
import { FC } from "react";
import LastAccessedListCard from "./LastAccessedListCard";
import ProgressCard from "./ProgressCard";
import RecentlyAddedCard from "./RecentlyAddedCard";

const StatisticsGrid: FC = () => {
  const theme = useTheme<Theme>();

  return (
    <Grid
      container
      height={{
        md: "calc(100vh - 64px - 16px)",
        lg: "auto",
      }}
      rowGap={1}
      sx={{
        overflowY: { md: "auto" },
        p: 1.5,
        ...theme.mixins.niceScroll(),
      }}
    >
      <Grid
        xs={12}
        sm={6}
        md={12}
        lg={6}
        item
        height="fit-content"
        pr={{ sm: 1.5 }}
      >
        <Stack gap={1.5}>
          <ProgressCard />
          <RecentlyAddedCard />
        </Stack>
      </Grid>

      <Grid xs={12} sm={6} md={12} lg={6} item>
        <LastAccessedListCard />
      </Grid>
    </Grid>
  );
};

export default StatisticsGrid;
