import React, { FC } from "react";
import MaqasidDialog from "src/components/MaqasidDialog";
import Chip from "@mui/material/Chip";
import { Button, Skeleton, Stack, Typography } from "@mui/material";
import useGetPolicy from "../hooks/useGetPolicy";
import ViewPolicyDialogSkeleton from "./ViewPolicyDialogSkeleton";
import { ViewPolicyDialogProps } from "./types";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import SegmentIcon from "@mui/icons-material/Segment";

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
          <Stack gap={2.5}>
            <Stack direction="row">
              <VpnKeyIcon
                sx={{ mr: 2, color: (theme) => theme.palette.grey[600] }}
              />

              <Typography variant="h6" sx={{ ml: 1 }}>
                {policy?.code}
              </Typography>
            </Stack>

            <Stack direction="row">
              <SegmentIcon
                sx={{ mr: 2, color: (theme) => theme.palette.grey[600] }}
              />
              <Typography>{policy?.summary}</Typography>
            </Stack>

            <Stack direction="row">
              <PictureAsPdfIcon
                sx={{ mr: 2, color: (theme) => theme.palette.grey[600] }}
              />
              <Button
                href={policy?.pdfUrl || ""}
                target="_blank"
                variant="text"
                sx={{ textTransform: "none", mt: -1 }}
              >
                Open Policy File
              </Button>
            </Stack>
          </Stack>
        </MaqasidDialog.Body>
      )}
    </MaqasidDialog>
  );
};

export default ViewPolicyDialog;
