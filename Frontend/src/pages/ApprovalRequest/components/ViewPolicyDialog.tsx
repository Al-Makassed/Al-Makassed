import React, { FC } from "react";

import MaqasidDialog from "src/components/MaqasidDialog";
import Chip from "@mui/material/Chip";
import { Button, Skeleton, Stack, Typography } from "@mui/material";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import useGetPolicy from "../hooks/useGetPolicy";
import ViewPolicyDialogSkeleton from "./ViewPolicyDialogSkeleton";

export interface ViewPolicyDialog {
  chapterId: string;
  policyId: string;
  open: boolean;
  onClose: () => void;
}

const ViewPolicyDialog: FC<ViewPolicyDialog> = ({
  chapterId,
  policyId,
  open,
  onClose,
}) => {
  const { policy, isFetching } = useGetPolicy(chapterId, policyId);

  const DialogHeader = isFetching ? (
    <Typography variant="h3" width={"50%"}>
      <Skeleton />
    </Typography>
  ) : (
    <MaqasidDialog.Title flex={1} title={policy?.name} />
  );

  return (
    <MaqasidDialog isOpen={open} onClose={onClose} variant="center">
      <MaqasidDialog.Header>
        {DialogHeader}

        <MaqasidDialog.Actions>
          <Chip label="Policy" />
          <MaqasidDialog.Close />
        </MaqasidDialog.Actions>
      </MaqasidDialog.Header>

      {isFetching ? (
        <MaqasidDialog.Body>
          <ViewPolicyDialogSkeleton />
        </MaqasidDialog.Body>
      ) : (
        <MaqasidDialog.Body>
          <Stack gap={2.5} alignItems="center" justifyContent="center">
            <Typography variant="body1">Policy Code: {policy?.code}</Typography>

            <Button
              startIcon={<FileOpenIcon />}
              href={policy?.pdfUrl}
              variant="contained"
              sx={{ maxWidth: 400 }}
            >
              Open Policy File
            </Button>
          </Stack>
        </MaqasidDialog.Body>
      )}
    </MaqasidDialog>
  );
};

export default ViewPolicyDialog;
