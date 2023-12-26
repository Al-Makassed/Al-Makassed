import { Grid, Skeleton, Typography } from "@mui/material";
import { FC } from "react";
import FieldsListSkeleton from "./FieldsListSkeleton";

const LoadingSkeleton: FC = () => {
  return (
    <Grid container px={3}>
      <Typography variant="h2" width={"50%"} mb={2}>
        <Skeleton />
      </Typography>

      <Grid item width={"100%"} xs={12} md={8}>
        <FieldsListSkeleton />
      </Grid>

      <Grid item sm={0} md={4} pl={3}>
        <Skeleton variant="rounded" height={"calc(100vh - 64px - 113px)"} />
      </Grid>
    </Grid>
  );
};

export default LoadingSkeleton;
