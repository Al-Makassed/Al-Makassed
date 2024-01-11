import React, { FC } from "react";
import { ViewDependencyDialogProps } from "./types";
import MaqasidDialog from "src/components/MaqasidDialog";
import { Button, Chip, Skeleton, Stack, Typography } from "@mui/material";
import useGetDependency from "../hooks/useGetDependency";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import PersonIcon from "@mui/icons-material/Person";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { PolicyDependencyType } from "../constants";
import ViewDependencyDialogSkeleton from "./ViewDependencyDialogSkeleton";

const ViewDependencyDialog: FC<ViewDependencyDialogProps> = ({
  chapterId,
  policyId,
  dependencyId,
  open,
  onClose,
}) => {
  const { dependency, isFetching } = useGetDependency({
    chapterId,
    policyId,
    id: dependencyId,
  });

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
          {dependency?.type === PolicyDependencyType.Form && (
            <Chip label="Form" />
          )}
          {dependency?.type === PolicyDependencyType.Poster && (
            <Chip label="Poster" />
          )}
          {dependency?.type === PolicyDependencyType.Protocol && (
            <Chip label="Protocol" />
          )}
          <MaqasidDialog.Close />
        </MaqasidDialog.Actions>
      </MaqasidDialog.Header>

      {isFetching ? (
        <MaqasidDialog.Body>
          <ViewDependencyDialogSkeleton />
        </MaqasidDialog.Body>
      ) : (
        <MaqasidDialog.Body>
          <Stack gap={2.5}>
            <Stack direction="row">
              <VpnKeyIcon
                sx={{ mr: 2, color: (theme) => theme.palette.grey[600] }}
              />

              <Typography>{dependency?.code}</Typography>
            </Stack>

            <Stack direction="row">
              <AccessAlarmsIcon
                sx={{ mr: 2, color: (theme) => theme.palette.grey[600] }}
              />
              <Typography>{dependency?.estimatedTime}</Typography>
            </Stack>

            <Stack direction="row">
              <PersonIcon
                sx={{ mr: 2, color: (theme) => theme.palette.grey[600] }}
              />
              <Typography> {dependency?.creatorId}</Typography>
            </Stack>
            <Stack direction="row">
              <AutoStoriesIcon
                sx={{ mr: 2, color: (theme) => theme.palette.grey[600] }}
              />
              <Typography> {dependency?.pagesCount}</Typography>
            </Stack>

            <Stack direction="row">
              <PictureAsPdfIcon
                sx={{ mr: 2, color: (theme) => theme.palette.grey[600] }}
              />
              <Button
                href={dependency?.pdfUrl || ""}
                target="_blank"
                variant="text"
                sx={{ textTransform: "none", mt: -1 }}
              >
                Open Dependency File
              </Button>
            </Stack>
          </Stack>
        </MaqasidDialog.Body>
      )}
    </MaqasidDialog>
  );
};

export default ViewDependencyDialog;
