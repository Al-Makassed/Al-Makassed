import { Grid, Skeleton } from "@mui/material";
import { FC } from "react";

const MonitoringToolsSkeleton: FC = () => {
  return (
    <Grid container gap={3} alignItems="center">
      {Array.from(Array(6)).map((index) => (
        <Grid
          item
          key={index}
          sx={{
            width: {
              xs: "100%",
              sm: "calc((100% - 24px) / 2)",
              md: "calc((100% - 48px) / 3)",
              xl: "calc((100% - 72px) / 4)",
            },
            height: 230,
          }}
        >
          <Skeleton variant="rounded" height="100%" />
        </Grid>
      ))}
    </Grid>
  );
};

export default MonitoringToolsSkeleton;
