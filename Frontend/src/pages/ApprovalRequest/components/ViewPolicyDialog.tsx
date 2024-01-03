import React, { FC } from "react";
import MaqasidDialog from "src/components/MaqasidDialog";
import Chip from "@mui/material/Chip";
import { Button, Skeleton, Stack, Typography } from "@mui/material";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import useGetPolicy from "../hooks/useGetPolicy";
import ViewPolicyDialogSkeleton from "./ViewPolicyDialogSkeleton";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { ViewPolicyDialogProps } from "./types";

const ViewPolicyDialog: FC<ViewPolicyDialogProps> = ({
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

  const DialogFooter = isFetching ? (
    <Typography variant="button" width={"25%"}>
      <Skeleton height={20} />
    </Typography>
  ) : (
    <Button
      startIcon={<FileOpenIcon />}
      href={policy?.pdfUrl}
      variant="contained"
      sx={{ maxWidth: 400 }}
    >
      Open Policy File
    </Button>
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
            <Stack direction="row">
              <QrCodeIcon
                sx={{ mr: 2, color: (theme) => theme.palette.grey[800] }}
              />
              <Typography variant="h6">Code: </Typography>
              <Typography variant="overline" sx={{ ml: 1 }}>
                {policy?.code}
              </Typography>
            </Stack>
          </Stack>
        </MaqasidDialog.Body>
      )}
      <MaqasidDialog.Footer>{DialogFooter}</MaqasidDialog.Footer>
    </MaqasidDialog>
  );
};

export default ViewPolicyDialog;
