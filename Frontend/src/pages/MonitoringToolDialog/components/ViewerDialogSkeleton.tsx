import React, { FC } from "react";
import { Box, Skeleton, Stack } from "@mui/material";
import SectionHeaderSkeleton from "./SectionHeaderSkeleton";

const ViewerDialogSkeleton: FC = () => {
  return (
    <Stack gap={2}>
      <Skeleton
        variant="rounded"
        sx={{ borderRadius: 10 }}
        height={35}
        width={"50%"}
      />

      <SectionHeaderSkeleton />
      {/* <Skeleton variant="rounded" height={90} width={"95%"} /> */}
      <Box sx={{ width: "100%" }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>

      <SectionHeaderSkeleton />
      <Skeleton variant="rounded" height={28} width={"80%"} />
      <Skeleton variant="rounded" height={28} width={"87%"} animation="wave" />
      <Skeleton variant="rounded" height={28} width={"95%"} animation={false} />

      <SectionHeaderSkeleton />
      <Stack direction={"row"} gap={1}>
        <Skeleton
          variant="rounded"
          height={25}
          width={"15%"}
          sx={{ borderRadius: 20 }}
        />
        <Skeleton
          variant="rounded"
          height={25}
          width={"15%"}
          sx={{ borderRadius: 20 }}
          animation="wave"
        />
        <Skeleton
          variant="rounded"
          height={25}
          width={"20%"}
          sx={{ borderRadius: 20 }}
          animation={false}
        />
      </Stack>
    </Stack>
  );
};

export default ViewerDialogSkeleton;
