import React, { FC } from "react";
import { Skeleton, Stack } from "@mui/material";
import useSidebarContext from "src/pages/PoliciesAndProcedures/context/useSidebar";

const PolicyDetailsLoadingSkeleton: FC = () => {
  const {
    state: { isSidebarOpen },
  } = useSidebarContext();

  return (
    <Stack alignItems={isSidebarOpen ? "flex-end" : "flex-start"}>
      <Stack
        gap={3}
        pr={5}
        pl={{ xs: 5, sm: isSidebarOpen ? 5 : 9 }}
        py={{ xs: 5, sm: 1.75 }}
        width={isSidebarOpen ? "calc(100vw - 400px)" : "100vw"}
        sx={{
          transition: "width 350ms ease-in-out",
        }}
      >
        <Stack direction="row" gap={1} alignItems="center">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width={100}
              height={20}
            />
          ))}
        </Stack>
        <Skeleton variant="rounded" height={45} width={300} />
        <Skeleton variant="rounded" height={30} width="100%" />
        <Stack gap={2}>
          <Skeleton variant="rounded" height={30} width={100} />
          <Skeleton variant="rounded" height={30} width={200} />
        </Stack>
        <Stack gap={2}>
          <Skeleton variant="rounded" height={30} width={100} />
          <Skeleton variant="rounded" height={100} width="min(100%, 600px)" />
        </Stack>

        <Skeleton variant="rounded" height={30} width={200} />
      </Stack>
    </Stack>
  );
};

export default PolicyDetailsLoadingSkeleton;
