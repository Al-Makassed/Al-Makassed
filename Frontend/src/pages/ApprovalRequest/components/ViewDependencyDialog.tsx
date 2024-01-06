import React, { FC } from "react";
import { ViewDependencyDialogProps } from "./types";
import MaqasidDialog from "src/components/MaqasidDialog";
import { Chip, Skeleton, Stack, Typography } from "@mui/material";
import useGetDependency from "../hooks/useGetDependency";

const ViewDependencyDialog: FC<ViewDependencyDialogProps> = ({
  policyId,
  dependencyId,
  chapterId,
  open,
  onClose,
}) => {
  //  chapterId = "402b9f32-64f2-41d9-762d-08dbd6f10490";

  const { dependency, isFetching } = useGetDependency(
    chapterId,
    policyId,
    dependencyId,
  );

  const DialogHeader = isFetching ? (
    <Typography variant="h3" width={"50%"}>
      <Skeleton />
    </Typography>
  ) : (
    <MaqasidDialog.Title flex={1} title={dependency?.name} />
  );
  return (
    <MaqasidDialog isOpen={open} onClose={onClose} variant="center">
      <MaqasidDialog.Header>
        {DialogHeader}
        <MaqasidDialog.Actions>
          <Chip label="Dependency" />
          <MaqasidDialog.Close />
        </MaqasidDialog.Actions>
      </MaqasidDialog.Header>

      {/* {isFetching ? ( */}
      {/* // <MaqasidDialog.Body>
                //   <ViewPolicyDialogSkeleton />
                // </MaqasidDialog.Body> */}
      {/* ) : ( */}
      <MaqasidDialog.Body>
        <Stack gap={2.5}>
          <Stack direction="row">
            {/* <VpnKeyIcon
                        sx={{ mr: 2, color: (theme) => theme.palette.grey[600] }}
                      /> */}

            <Typography variant="h6" sx={{ ml: 1 }}>
              {dependency?.code}
            </Typography>
          </Stack>

          <Stack direction="row">
            <Typography>This is summary </Typography>
          </Stack>

          <Stack direction="row"></Stack>
        </Stack>
      </MaqasidDialog.Body>
      {/* )} */}
    </MaqasidDialog>
  );
};

export default ViewDependencyDialog;
