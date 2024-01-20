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
        py={6}
        width={isSidebarOpen ? "calc(100vw - 400px)" : "100vw"}
        sx={{
          transition: "width 350ms ease-in-out",
        }}
      >
        <Stack gap={3} alignItems="center">
          <Skeleton variant="rectangular" height={20} width={100} />
          <Skeleton variant="rectangular" height={30} width={500} />
          <Skeleton variant="rectangular" height={20} width={100} />
        </Stack>
        <Stack direction="row" gap={5}>
          <Skeleton variant="rounded" height={50} width={300} />
          <Skeleton variant="rounded" height={50} width={300} />
          <Skeleton variant="rounded" height={50} width={300} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PolicyDetailsLoadingSkeleton;
