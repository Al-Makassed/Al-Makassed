import { Grid, Skeleton, Stack } from "@mui/material";
import { FC } from "react";

const UserProfileLoadingSkeleton: FC = () => {
  return (
    <Grid
      container
      sx={{
        bgcolor: "grey.100",
        p: { xs: 2, md: 2.5 },
        height: "calc(100vh - 64px)",
      }}
      display={{ xs: "block", md: "flex" }}
      justifyContent={{ xs: "flex-start", md: "center" }}
    >
      <Grid
        item
        xs={0}
        md={4}
        lg={3}
        pr={1}
        display={{ xs: "none", md: "block" }}
      >
        <Skeleton
          variant="rounded"
          height="calc(100vh - 64px - 20px - 20px)"
          sx={{ my: 0.5 }}
        />
      </Grid>

      <Grid item xs={12} md={8} pl={{ xs: 0, sm: 2 }}>
        <Stack gap={2.2}>
          <Grid item>
            <Skeleton variant="rounded" height="211px" />
          </Grid>
          <Grid item>
            <Skeleton
              variant="rounded"
              height="calc(100vh - 64px - 40px - 211px - 16px)"
            />
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default UserProfileLoadingSkeleton;
