import { Grid, Skeleton } from "@mui/material";
import React, { FC } from "react";

const MonitoringToolsSkeleton: FC = () => {
  return (
    <Grid
      container
      spacing={{ xs: 4, md: 4 }}
      columns={{ xs: 2, sm: 2, md: 8, lg: 12 }}
      maxWidth={"85vw"}
    >
      {Array.from(Array(6)).map((index) => (
        <Grid
          item
          xs={2}
          sm={4}
          md={4}
          display={"flex"}
          justifyContent={"center"}
          key={index}
        >
          <Skeleton
            variant="rectangular"
            sx={{ width: { xs: 230, sm: 330 } }}
            height={230}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MonitoringToolsSkeleton;
