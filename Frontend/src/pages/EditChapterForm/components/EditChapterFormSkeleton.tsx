import React from "react";
import { Grid, Skeleton, Stack, useTheme } from "@mui/material";

const EditChapterFormSkeleton = () => {
  const theme = useTheme();

  return (
    <Grid
      container
      sx={{
        height: (theme) => `calc(100vh - ${theme.mixins.toolbar.height}px)`,
        justifyContent: "center",
        alignItems: "center",
        ...theme.mixins.niceScroll(),
      }}
    >
      <Stack spacing={3} padding={6} width={500}>
        <Skeleton variant="text" width="100%" height={60} animation="wave" />

        <Skeleton variant="text" width="100%" height={60} animation="wave" />

        <Skeleton
          variant="rectangular"
          width="100%"
          height={150}
          animation="wave"
        />
      </Stack>
    </Grid>
  );
};

export default EditChapterFormSkeleton;
