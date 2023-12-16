import { FC } from "react";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

const LoadingSkeleton: FC = () => {
  return (
    <Grid container justifyContent="center" alignItems="center" gap={1}>
      <Grid item xs={12} md={4}>
        <Skeleton variant="rectangular" height={230} />
      </Grid>
      <Grid item xs={12} md={2}>
        <Grid
          container
          direction={{ xs: "row", md: "column" }}
          alignItems="center"
          justifyContent="center"
        >
          <Stack gap={1}>
            <Skeleton
              variant="rounded"
              height={50}
              width={50}
              sx={{ display: "block" }}
            />
            <Skeleton
              variant="rounded"
              height={50}
              width={50}
              sx={{ display: "block" }}
            />
          </Stack>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <Skeleton variant="rectangular" height={230} />
      </Grid>
    </Grid>
  );
};

export default LoadingSkeleton;
