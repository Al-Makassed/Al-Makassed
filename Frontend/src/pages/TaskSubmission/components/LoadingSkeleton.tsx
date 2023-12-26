import { Grid, Skeleton, Typography } from "@mui/material";
import { FC } from "react";
import FieldsListSkeleton from "./FieldsListSkeleton";

const LoadingSkeleton: FC = () => {
  return (
    <Grid container p={4}>
      <Grid item width={"100%"} xs={12} md={8}>
        <Typography variant="h1" width={"50%"}>
          <Skeleton />
        </Typography>

        <Typography variant="h6" width={"20%"} sx={{ mt: "auto" }}>
          <Skeleton />
        </Typography>

        <FieldsListSkeleton />
      </Grid>

      <Grid item md={4} pl={3} pt={3}>
        <Skeleton
          variant="rounded"
          height={"calc(100vh - 64px - 32px - 32px)"}
        />
      </Grid>
    </Grid>
  );
};

export default LoadingSkeleton;
