import React, { FC } from "react";
import { Skeleton, Stack } from "@mui/material";
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
      <Skeleton variant="rounded" height={90} width={"95%"} />

      {Array.from(Array(2)).map((index) => (
        <Stack gap={1} key={index}>
          <SectionHeaderSkeleton />

          <Skeleton variant="rounded" height={35} width={"87%"} />
          <Skeleton variant="rounded" height={35} width={"95%"} />
        </Stack>
      ))}
    </Stack>
  );
};

export default ViewerDialogSkeleton;
